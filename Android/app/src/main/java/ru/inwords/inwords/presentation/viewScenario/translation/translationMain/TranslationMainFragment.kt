package ru.inwords.inwords.presentation.viewScenario.translation.translationMain


import android.media.AudioAttributes
import android.media.MediaPlayer
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.view.ActionMode
import androidx.appcompat.widget.SearchView
import androidx.navigation.ui.NavigationUI
import androidx.recyclerview.selection.SelectionTracker
import androidx.recyclerview.selection.StorageStrategy
import androidx.recyclerview.widget.DividerItemDecoration
import androidx.recyclerview.widget.ItemTouchHelper
import androidx.recyclerview.widget.LinearLayoutManager
import com.google.android.material.snackbar.BaseTransientBottomBar
import com.google.android.material.snackbar.Snackbar
import io.reactivex.subjects.PublishSubject
import io.reactivex.subjects.Subject
import kotlinx.android.synthetic.main.fragment_translation_main.*
import ru.inwords.inwords.R
import ru.inwords.inwords.core.SelectionDetailsLookup
import ru.inwords.inwords.core.SelectionKeyProvider
import ru.inwords.inwords.core.util.SchedulersFacade
import ru.inwords.inwords.data.dto.WordTranslation
import ru.inwords.inwords.domain.model.Resource
import ru.inwords.inwords.presentation.viewScenario.FragmentWithViewModelAndNav
import ru.inwords.inwords.presentation.viewScenario.translation.TranslationViewModelFactory
import ru.inwords.inwords.presentation.viewScenario.translation.recycler.ItemTouchHelperAdapter
import ru.inwords.inwords.presentation.viewScenario.translation.recycler.ItemTouchHelperEvents
import ru.inwords.inwords.presentation.viewScenario.translation.recycler.WordTranslationsAdapter
import ru.inwords.inwords.presentation.viewScenario.translation.recycler.applyDiffUtil

class TranslationMainFragment : FragmentWithViewModelAndNav<TranslationMainViewModel, TranslationViewModelFactory>(), ItemTouchHelperEvents {
    override val layout = R.layout.fragment_translation_main
    override val classType = TranslationMainViewModel::class.java

    private lateinit var adapter: WordTranslationsAdapter

    private lateinit var tracker: SelectionTracker<WordTranslation>

    private var actionMode: ActionMode? = null

    private lateinit var mediaPlayer: MediaPlayer
    private val attrs = AudioAttributes.Builder().setContentType(AudioAttributes.CONTENT_TYPE_SPEECH).build()

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        NavigationUI.setupWithNavController(toolbar, navController)

        setupToolbar(view)

        mediaPlayer = MediaPlayer()

        val onItemClickedListener = PublishSubject.create<WordTranslation>()
        val onSpeakerClickedListener = PublishSubject.create<WordTranslation>()
        setupRecyclerView(view, onItemClickedListener, onSpeakerClickedListener)
        if (savedInstanceState != null) {
            tracker.onRestoreInstanceState(savedInstanceState)
        }

        viewModel.addEditWordLiveData.observe(this::getLifecycle) { event ->
            event.contentIfNotHandled?.also {
                navController.navigate(TranslationMainFragmentDirections.actionTranslationMainFragmentToAddEditWordFragment(it))
            }
        }

        viewModel.ttsStream
                .doOnNext {
                    if (it is Resource.Success) {
                        playAudio(it.data)
                    }
                }
                .observeOn(SchedulersFacade.ui())
                .subscribe { resource ->
                    progress_view.post { progress_view.progress = 0 }

                    if (resource !is Resource.Success) {
                        Toast.makeText(context, getString(R.string.unable_to_load_voice), Toast.LENGTH_SHORT).show()
                    }
                }
                .disposeOnViewDestroyed()

        viewModel.translationWordsStream
                .applyDiffUtil()
                .observeOn(SchedulersFacade.ui())
                .subscribe(adapter)
                .disposeOnViewDestroyed()

        fab.setOnClickListener { viewModel.onAddClicked() } //TODO clicks
        viewModel.onEditClickedHandler(onItemClickedListener)
        viewModel.onSpeakerClickedHandler(onSpeakerClickedListener.doOnNext { progress_view.progress = 50 })
    }

    override fun onDestroyView() {
        mediaPlayer.stop()
        mediaPlayer.release()

        adapter.tracker = null

        actionMode?.finish()

        super.onDestroyView()
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        tracker.onSaveInstanceState(outState)
    }

    private fun playAudio(path: String) {
        try {
            mediaPlayer.reset()
            mediaPlayer.setDataSource(path)
            mediaPlayer.setAudioAttributes(attrs)
            mediaPlayer.prepare()
            mediaPlayer.start()
        } catch (throwable: Throwable) {
            Log.e(javaClass.simpleName, throwable.message.orEmpty())
        }
    }

    private fun setSelectedTitle(selected: Int) {
        actionMode?.title = "Выбрано: $selected"
    }

    private fun setupToolbar(view: View) {
        val search = toolbar.menu.findItem(R.id.action_search)
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

    private fun setupRecyclerView(view: View, onItemClickedListener: Subject<WordTranslation>, onSpeakerClickedListener: Subject<WordTranslation>) {
        val context = view.context

        adapter = WordTranslationsAdapter(LayoutInflater.from(context), onItemClickedListener, onSpeakerClickedListener)

        val layoutManager = LinearLayoutManager(context)
        val dividerItemDecoration = DividerItemDecoration(context, layoutManager.orientation)

        recycler_view.layoutManager = layoutManager
        recycler_view.adapter = adapter
        recycler_view.addItemDecoration(dividerItemDecoration)

        val callback = ItemTouchHelperAdapter(this) //TODO
        val touchHelper = ItemTouchHelper(callback)
        touchHelper.attachToRecyclerView(recycler_view)

        setupTracker()

        adapter.tracker = tracker
    }

    private fun setupTracker() {
        fun getItems() = adapter.items

        tracker = SelectionTracker
                .Builder(
                        // идентифицируем трекер в контексте
                        "wordTranslationTracker",
                        recycler_view,
                        // для Long ItemKeyProvider реализован в виде StableIdKeyProvider
                        SelectionKeyProvider({ getItems().getOrNull(it) }, { getItems().indexOf(it) }),
                        SelectionDetailsLookup(recycler_view),
                        // существуют аналогичные реализации для Long и String
                        StorageStrategy.createParcelableStorage(WordTranslation::class.java)
                ).build()

        tracker.addObserver(object : SelectionTracker.SelectionObserver<Any>() {
            override fun onSelectionChanged() {
                super.onSelectionChanged()

                val activity = requireActivity() as AppCompatActivity

                if (tracker.hasSelection() && actionMode == null) {
                    actionMode = activity.startSupportActionMode(DictionaryActionModeController(tracker)) //TODO make it floating

                    actionMode?.menu?.findItem(R.id.remove)?.setOnMenuItemClickListener {
                        onItemsDismiss(tracker.selection.toList())
                        actionMode?.finish()
                        actionMode = null
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
        })
    }

    override fun onItemDismiss(position: Int) {
        val item = adapter.items[position].clone()
        viewModel.onItemDismiss(item.clone())

        Snackbar.make(root_coordinator, getString(R.string.translation_deleted), Snackbar.LENGTH_LONG)
                .setAction(getString(R.string.undo_translation_deletion)) { viewModel.onItemDismissUndo(item) }
                .addCallback(SnackBarCallback(item))
                .show()
    }

    fun onItemsDismiss(items: List<WordTranslation>) {
        viewModel.onItemsDismiss(items.map { it.clone() })

        Snackbar.make(root_coordinator, getString(R.string.translation_multiple_deleted, items.size), Snackbar.LENGTH_LONG)
                .setAction(getString(R.string.undo_translation_deletion)) { viewModel.onItemsDismissUndo(items) }
                .addCallback(SnackBarCallback2(items))
                .show()
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
}
