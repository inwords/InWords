package ru.inwords.inwords.game.presentation.listening

import android.content.Context
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.core.view.isVisible
import androidx.core.view.postDelayed
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentResultListener
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.navArgs
import androidx.recyclerview.widget.DiffUtil
import androidx.viewpager2.adapter.FragmentStateAdapter
import ru.inwords.inwords.R
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.core.utils.observe
import ru.inwords.inwords.databinding.FragmentListeningBinding
import ru.inwords.inwords.game.domain.model.ListeningLevelData
import ru.inwords.inwords.game.domain.model.UsersChoice
import ru.inwords.inwords.game.domain.model.WordModel
import ru.inwords.inwords.game.presentation.WordsSetsViewModelFactory
import ru.inwords.inwords.presentation.view_scenario.FragmentWithViewModelAndNav
import ru.inwords.inwords.texttospeech.TtsMediaPlayerAdapter

class ListeningFragment : FragmentWithViewModelAndNav<ListeningViewModel, WordsSetsViewModelFactory, FragmentListeningBinding>() {
    override val layout = R.layout.fragment_listening
    override val classType = ListeningViewModel::class.java

    override fun provideViewModel() = viewModelWorkaround

    override fun bindingInflate(inflater: LayoutInflater, container: ViewGroup?, attachToRoot: Boolean): FragmentListeningBinding {
        return FragmentListeningBinding.inflate(inflater, container, attachToRoot)
    }

    private val viewModelWorkaround: ListeningViewModel by viewModels { modelFactory }

    private val args by navArgs<ListeningFragmentArgs>()

    override fun onAttach(context: Context) {
        super.onAttach(context)
        viewModel.setTrainingState(args.trainingState)
        viewModel.onGameLevelSelected(args.gameId, args.gameLevelInfo)

//        val callback = object : OnBackPressedCallback(true) {
//            override fun handleOnBackPressed() {
//                if (binding.viewPager.currentItem == 0) {
//                    isEnabled = false
//                    requireActivity().onBackPressed()
//                } else {
//                    binding.viewPager.currentItem = binding.viewPager.currentItem - 1
//                }
//            }
//        }
//        requireActivity().onBackPressedDispatcher.addCallback(this, callback)

        childFragmentManager.setFragmentResultListener(
            LISTENING_LEVEL_RESULT_WORD_CHOSEN_KEY,
            this,
            FragmentResultListener { _: String, result: Bundle ->
                result.getParcelable<UsersChoice>(USERS_CHOICE_KEY)?.let { viewModel.onWordChosen(it) }
            })
        childFragmentManager.setFragmentResultListener(
            LISTENING_LEVEL_RESULT_TTS_CLICKED_KEY,
            this,
            FragmentResultListener { _: String, result: Bundle ->
                result.getParcelable<WordModel>(WORD_MODEL_KEY)?.let { viewModel.ttsWordModel(it) }
            })
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setupWithNavController(binding.toolbar)


        observe(viewModel.progress) {
            binding.progressView.progress = if (it) 50 else 0
            binding.progressView.isVisible = it
        }

        val pagerAdapter = ListeningLevelsPagerAdapter(this)
        binding.viewPager.isUserInputEnabled = false

        observe(viewModel.usersChoice) {
            view.postDelayed(900) {
                if (pagerAdapter.itemCount == binding.viewPager.currentItem + 1) {
                    viewModel.onListeningEnd()
                } else {
                    binding.viewPager.currentItem = binding.viewPager.currentItem + 1
                }
            }
        }

        val ttsMediaPlayerAdapter = TtsMediaPlayerAdapter { resource ->
            if (resource !is Resource.Success) {
                Toast.makeText(context, getString(R.string.unable_to_load_voice), Toast.LENGTH_SHORT).show()
            }
        }

        ttsMediaPlayerAdapter
            .observeTtsStream(viewModel.ttsStream)
            .disposeOnViewDestroyed()

        viewModel.trainingData
            .observeOn(SchedulersFacade.ui())
            .subscribe {
                pagerAdapter.setData(it)
                if (binding.viewPager.adapter != pagerAdapter) {
                    binding.viewPager.adapter = pagerAdapter
                }
            }.disposeOnViewDestroyed()
    }

    private class ListeningLevelsPagerAdapter(fragment: Fragment) : FragmentStateAdapter(fragment) {
        private var data: List<ListeningLevelData> = emptyList()

        override fun getItemCount(): Int = data.size

        override fun createFragment(position: Int): Fragment {
            return ListeningLevelFragment.newInstance(ListeningLevelFragmentArgs(data[position]))
        }

        override fun getItemId(position: Int): Long {
            return data[position].levelIndex.toLong()
        }

        override fun containsItem(itemId: Long): Boolean {
            return data.any { it.levelIndex.toLong() == itemId }
        }

        fun setData(listeningData: Pair<List<ListeningLevelData>, DiffUtil.DiffResult>) {
            data = listeningData.first
            listeningData.second.dispatchUpdatesTo(this)
        }
    }

}