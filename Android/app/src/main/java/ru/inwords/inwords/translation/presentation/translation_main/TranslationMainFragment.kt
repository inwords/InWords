package ru.inwords.inwords.translation.presentation.translation_main


import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.view.ActionMode
import androidx.appcompat.widget.SearchView
import androidx.recyclerview.selection.SelectionTracker
import androidx.recyclerview.selection.StorageStrategy
import androidx.recyclerview.widget.DividerItemDecoration
import androidx.recyclerview.widget.LinearLayoutManager
import com.google.android.material.snackbar.BaseTransientBottomBar
import com.google.android.material.snackbar.Snackbar
import io.reactivex.subjects.PublishSubject
import io.reactivex.subjects.Subject
import ru.inwords.inwords.R
import ru.inwords.inwords.core.recycler.SelectionDetailsLookup
import ru.inwords.inwords.core.recycler.SelectionKeyProvider
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.databinding.FragmentTranslationMainBinding
import ru.inwords.inwords.presentation.view_scenario.FragmentWithViewModelAndNav
import ru.inwords.inwords.texttospeech.TtsMediaPlayerAdapter
import ru.inwords.inwords.translation.domain.model.WordTranslation
import ru.inwords.inwords.translation.presentation.TranslationViewModelFactory
import ru.inwords.inwords.translation.presentation.recycler.ItemTouchHelperEvents
import ru.inwords.inwords.translation.presentation.recycler.WordTranslationsAdapter
import ru.inwords.inwords.translation.presentation.recycler.applyDiffUtil

class TranslationMainFragment : FragmentWithViewModelAndNav<TranslationMainViewModel, TranslationViewModelFactory, FragmentTranslationMainBinding>(), ItemTouchHelperEvents {
    override val layout = R.layout.fragment_translation_main
    override val classType = TranslationMainViewModel::class.java

    override fun bindingInflate(inflater: LayoutInflater, container: ViewGroup?, attachToRoot: Boolean): FragmentTranslationMainBinding {
        return FragmentTranslationMainBinding.inflate(inflater, container, attachToRoot)
    }

    private lateinit var recyclerAdapter: WordTranslationsAdapter

    private lateinit var tracker: SelectionTracker<WordTranslation>

    private var actionMode: ActionMode? = null

    private lateinit var ttsMediaPlayerAdapter: TtsMediaPlayerAdapter

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        return super.onCreateView(inflater, container, savedInstanceState).also { view ->
            setupToolbar()

            val onSpeakerClickedListener = PublishSubject.create<WordTranslation>()
            setupRecyclerView(onSpeakerClickedListener)

            if (savedInstanceState != null) {
                tracker.onRestoreInstanceState(savedInstanceState)
                onTrackerSelectionChanged()
            }

            viewModel.onSpeakerClickedHandler(onSpeakerClickedListener.doOnNext { binding.progressView.progress = 50 })

            binding.fab.setOnClickListener { viewModel.onAddClicked() } //TODO clicks
        }
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setupWithNavController(binding.toolbar)

        ttsMediaPlayerAdapter = TtsMediaPlayerAdapter { resource ->
            binding.progressView.post { binding.progressView.progress = 0 }

            if (resource !is Resource.Success) {
                Toast.makeText(context, getString(R.string.unable_to_load_voice), Toast.LENGTH_SHORT).show()
            }
        }

        ttsMediaPlayerAdapter
            .observeTtsStream(viewModel.ttsStream)
            .disposeOnViewDestroyed()

        viewModel.translationWordsStream
            .applyDiffUtil()
            .observeOn(SchedulersFacade.ui())
            .subscribe({
                recyclerAdapter.accept(it)
                val quantity = it.first.size
                binding.toolbar.subtitle = resources.getQuantityString(R.plurals.words_in_dictionary, quantity, quantity)
            }, {
                Log.wtf(TAG, it)
            })
            .disposeOnViewDestroyed()
    }

    override fun onDestroyView() {
        ttsMediaPlayerAdapter.destroy()

        recyclerAdapter.tracker = null

        actionMode?.finish()

        super.onDestroyView()
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        if (::tracker.isInitialized) {
            tracker.onSaveInstanceState(outState)
        }
    }

    private fun setSelectedTitle(selected: Int) {
        actionMode?.title = "Выбрано: $selected"
    }

    private fun setupToolbar() {
        val search = binding.toolbar.menu.findItem(R.id.action_search)
        val searchView = search.actionView as SearchView

        searchView.setOnQueryTextListener(object : SearchView.OnQueryTextListener {
            override fun onQueryTextSubmit(query: String): Boolean {
                Log.d("query", query)
                return false
            }

            override fun onQueryTextChange(newText: String): Boolean {
                viewModel.onSearchQueryChange(newText)
                return false
            }
        })
    }

    private fun setupRecyclerView(onSpeakerClickedListener: Subject<WordTranslation>) {
        val context = requireContext()
        val scaleText = viewModel.scaleText

        recyclerAdapter = WordTranslationsAdapter({ viewModel.onEditClicked(it) }, onSpeakerClickedListener, scaleText)

        val linearLayoutManager = LinearLayoutManager(context)
        val dividerItemDecoration = DividerItemDecoration(context, linearLayoutManager.orientation)

        with(binding.recyclerView) {
            layoutManager = linearLayoutManager
            adapter = recyclerAdapter
            addItemDecoration(dividerItemDecoration)
        }

//        val callback = ItemTouchHelperAdapter(this@TranslationMainFragment) //TODO
//        val touchHelper = ItemTouchHelper(callback)
//        touchHelper.attachToRecyclerView(recycler_view)

        setupTracker()

        recyclerAdapter.tracker = tracker
    }

    private fun setupTracker() {
        fun getItems() = recyclerAdapter.items

        tracker = SelectionTracker
            .Builder(
                // идентифицируем трекер в контексте
                "wordTranslationTracker",
                binding.recyclerView,
                // для Long ItemKeyProvider реализован в виде StableIdKeyProvider
                SelectionKeyProvider({ getItems().getOrNull(it) }, { getItems().indexOf(it) }),
                SelectionDetailsLookup(binding.recyclerView),
                // существуют аналогичные реализации для Long и String
                StorageStrategy.createParcelableStorage(WordTranslation::class.java)
            ).build()

        tracker.addObserver(object : SelectionTracker.SelectionObserver<WordTranslation>() {
            override fun onSelectionChanged() {
                super.onSelectionChanged()

                onTrackerSelectionChanged()
            }
        })
    }

    override fun onItemDismiss(position: Int) {
        val item = recyclerAdapter.items[position]
        viewModel.onItemDismiss(item)

        Snackbar.make(binding.rootCoordinator, getString(R.string.translation_deleted), Snackbar.LENGTH_LONG)
            .setAction(getString(R.string.undo_translation_deletion)) { viewModel.onItemDismissUndo(item) }
            .addCallback(SnackBarCallback(item))
            .show()
    }

    private fun onItemsDismiss(items: List<WordTranslation>) {
        viewModel.onItemsDismiss(items)

        Snackbar.make(binding.rootCoordinator, getString(R.string.translation_multiple_deleted, items.size), Snackbar.LENGTH_LONG)
            .setAction(getString(R.string.undo_translation_deletion)) { viewModel.onItemsDismissUndo(items) }
            .addCallback(SnackBarCallback2(items))
            .show()
    }

    private fun onTrackerSelectionChanged() {
        val activity = requireActivity() as AppCompatActivity

        if (tracker.hasSelection() && actionMode == null) {
            actionMode = activity.startSupportActionMode(DictionaryActionModeController(tracker)) //TODO make it floating

            actionMode?.menu?.findItem(R.id.remove)?.setOnMenuItemClickListener {
                onItemsDismiss(tracker.selection.toList())
                actionMode?.finish()
                actionMode = null
                true
            }

            actionMode?.menu?.findItem(R.id.play)?.setOnMenuItemClickListener {
                viewModel.onPlayClicked(tracker.selection.toList())
                actionMode?.finish()
                actionMode = null //TODO remove duplication
                true
            }

            setSelectedTitle(tracker.selection.size())
        } else if (!tracker.hasSelection()) {
            actionMode?.finish()
            actionMode = null
        } else {
            setSelectedTitle(tracker.selection.size())
        }
    }

    private inner class SnackBarCallback(private val word: WordTranslation) : BaseTransientBottomBar.BaseCallback<Snackbar>() {
        override fun onDismissed(transientBottomBar: Snackbar, event: Int) {
            viewModel.onConfirmItemDismiss(word)
        }
    }

    private inner class SnackBarCallback2(private val word: List<WordTranslation>) : BaseTransientBottomBar.BaseCallback<Snackbar>() {
        override fun onDismissed(transientBottomBar: Snackbar, event: Int) {
            viewModel.onConfirmItemsDismiss(word)
        }
    }

    companion object {
        const val TAG = "TranslationMainFragment"
    }
}
