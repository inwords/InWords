package ru.inwords.inwords.game.presentation.game_level

import android.content.Context
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.view.ContextThemeWrapper
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.NavController
import androidx.navigation.fragment.findNavController
import androidx.navigation.fragment.navArgs
import com.google.android.material.bottomsheet.BottomSheetDialogFragment
import dagger.android.support.AndroidSupportInjection
import io.reactivex.disposables.CompositeDisposable
import ru.inwords.inwords.R
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.core.utils.observe
import ru.inwords.inwords.data.validId
import ru.inwords.inwords.databinding.GameEndBinding
import ru.inwords.inwords.game.data.bean.LevelScore
import ru.inwords.inwords.game.domain.model.LevelResultModel
import ru.inwords.inwords.game.presentation.OctoGameViewModelFactory
import javax.inject.Inject

class GameEndBottomSheet : BottomSheetDialogFragment() {
    private val args by navArgs<GameEndBottomSheetArgs>()

    private val compositeDisposable = CompositeDisposable()
    private lateinit var levelResultModel: LevelResultModel

    @Inject
    internal lateinit var modelFactory: OctoGameViewModelFactory
    private lateinit var viewModel: GameLevelViewModel

    private lateinit var navController: NavController

    private lateinit var binding: GameEndBinding

    override fun onAttach(context: Context) {
        super.onAttach(context)
        AndroidSupportInjection.inject(this)

        levelResultModel = args.levelResultModel

        val realParentFragment = requireNotNull(parentFragment?.childFragmentManager?.fragments?.findLast { it is GameLevelFragment })
        viewModel = ViewModelProvider(realParentFragment, modelFactory).get(GameLevelViewModel::class.java)
    }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        val contextThemeWrapper = ContextThemeWrapper(activity, R.style.AppTheme) //needed to render this dialog with correct theme
        binding = GameEndBinding.inflate(inflater.cloneInContext(contextThemeWrapper), container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        navController = findNavController()

        compositeDisposable.add(viewModel.getScore(levelResultModel)
            .toObservable()
            .startWith(Resource.Loading())
            .observeOn(SchedulersFacade.ui())
            .subscribe {
                Log.d(TAG, it.toString())

                when (it) {
                    is Resource.Success -> showSuccess(it.data)
                    is Resource.Loading -> showLoading()
                    is Resource.Error -> showError()
                }
            })

        observe(viewModel.navigationFromGameEnd) {
            when (it) {
                FromGameEndEventsEnum.HOME -> navController.navigate(GameEndBottomSheetDirections.actionGlobalPopToMainFragment())
                FromGameEndEventsEnum.BACK -> navController.navigate(GameEndBottomSheetDirections.actionPopUpToGameLevelFragmentInclusive())
                FromGameEndEventsEnum.GAMES_FRAGMENT -> navController.navigate(GameEndBottomSheetDirections.actionPopUpToGamesFragment())
                else -> navController.navigate(GameEndBottomSheetDirections.actionPop())
            }
        }

        setupView()
    }

    override fun onDetach() {
        compositeDisposable.dispose()
        super.onDetach()
    }

    private fun setupView() {
        binding.buttonHome.setOnClickListener { viewModel.onNewEventCommand(FromGameEndEventsEnum.HOME) }
        binding.buttonBack.setOnClickListener { viewModel.onNewEventCommand(FromGameEndEventsEnum.BACK) }
        binding.buttonNext.setOnClickListener { viewModel.onNewEventCommand(FromGameEndEventsEnum.NEXT) }
        binding.buttonRetry.setOnClickListener { viewModel.onNewEventCommand(FromGameEndEventsEnum.REFRESH) }
    }

    private fun showSuccess(levelScore: LevelScore) {
        if (levelScore.levelId == levelResultModel.levelId || !validId(levelResultModel.levelId)) {
            binding.ratingBar.rating = levelScore.score.toFloat()
            binding.ratingBar.visibility = View.VISIBLE
            binding.ratingLoadingProgress.visibility = View.INVISIBLE
            binding.ratingNotLoaded.visibility = View.INVISIBLE
        }
    }

    private fun showLoading() {
        binding.ratingBar.visibility = View.INVISIBLE
        binding.ratingLoadingProgress.visibility = View.VISIBLE
        binding.ratingNotLoaded.visibility = View.INVISIBLE
    }

    private fun showError() {
        binding.ratingBar.visibility = View.INVISIBLE
        binding.ratingLoadingProgress.visibility = View.INVISIBLE
        binding.ratingNotLoaded.visibility = View.VISIBLE
    }

    companion object {
        const val TAG = "GameEndBottomSheet"
    }
}
