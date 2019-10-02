package ru.inwords.inwords.presentation.view_scenario.octo_game.gameLevel

import android.content.Context
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.view.ContextThemeWrapper
import androidx.lifecycle.ViewModelProviders
import androidx.navigation.NavController
import androidx.navigation.fragment.findNavController
import androidx.navigation.fragment.navArgs
import com.google.android.material.bottomsheet.BottomSheetDialogFragment
import dagger.android.support.AndroidSupportInjection
import io.reactivex.disposables.CompositeDisposable
import kotlinx.android.synthetic.main.game_end.*
import ru.inwords.inwords.R
import ru.inwords.inwords.core.Resource
import ru.inwords.inwords.core.util.SchedulersFacade
import ru.inwords.inwords.data.dto.game.LevelScore
import ru.inwords.inwords.domain.model.LevelResultModel
import ru.inwords.inwords.domain.util.validId
import ru.inwords.inwords.presentation.view_scenario.octo_game.OctoGameViewModelFactory
import javax.inject.Inject

class GameEndBottomSheet : BottomSheetDialogFragment() {
    private val args by navArgs<GameEndBottomSheetArgs>()

    private val compositeDisposable = CompositeDisposable()
    private lateinit var levelResultModel: LevelResultModel

    @Inject
    internal lateinit var modelFactory: OctoGameViewModelFactory
    private lateinit var viewModel: GameLevelViewModel

    private lateinit var navController: NavController

    override fun onAttach(context: Context) {
        super.onAttach(context)
        AndroidSupportInjection.inject(this)

        levelResultModel = args.levelResultModel

        val realParentFragment = requireNotNull(parentFragment?.childFragmentManager?.fragments?.findLast { it is GameLevelFragment })
        viewModel = ViewModelProviders.of(realParentFragment, modelFactory).get(GameLevelViewModel::class.java)
    }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        val contextThemeWrapper = ContextThemeWrapper(activity, R.style.AppTheme) //needed to render this dialog with correct theme
        return inflater.cloneInContext(contextThemeWrapper).inflate(R.layout.game_end, container, false)
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

        viewModel.navigationFromGameEnd.observe(this::getLifecycle) {
            when (it.contentIfNotHandled ?: return@observe) {
                FromGameEndEventsEnum.HOME -> navController.navigate(GameEndBottomSheetDirections.actionPopUpToMainFragment())
                FromGameEndEventsEnum.BACK -> navController.navigate(GameEndBottomSheetDirections.actionPopUpToGameLevelFragmentInclusive())
                else -> navController.navigate(GameEndBottomSheetDirections.actionPop())
            }
        }

        setupView(viewModel.getNextLevelInfo() is Resource.Success)
    }

    override fun onDetach() {
        compositeDisposable.dispose()
        super.onDetach()
    }

    private fun setupView(nextLevelAvailable: Boolean) {
        button_home.setOnClickListener { viewModel.onNewEventCommand(FromGameEndEventsEnum.HOME) }
        button_back.setOnClickListener { viewModel.onNewEventCommand(FromGameEndEventsEnum.BACK) }
        button_next.setOnClickListener { viewModel.onNewEventCommand(FromGameEndEventsEnum.NEXT) }
        button_retry.setOnClickListener { viewModel.onNewEventCommand(FromGameEndEventsEnum.REFRESH) }

        if (nextLevelAvailable) {
            button_next.visibility = View.VISIBLE
        } else {
            button_next.visibility = View.GONE
        }
    }

    private fun showSuccess(levelScore: LevelScore) {
        if (levelScore.levelId == levelResultModel.levelId || !validId(levelResultModel.levelId)) {
            rating_bar.rating = levelScore.score.toFloat()
            rating_bar.visibility = View.VISIBLE
            rating_loading_progress.visibility = View.INVISIBLE
            rating_not_loaded.visibility = View.INVISIBLE
        }
    }

    private fun showLoading() {
        rating_bar.visibility = View.INVISIBLE
        rating_loading_progress.visibility = View.VISIBLE
        rating_not_loaded.visibility = View.INVISIBLE
    }

    private fun showError() {
        rating_bar.visibility = View.INVISIBLE
        rating_loading_progress.visibility = View.INVISIBLE
        rating_not_loaded.visibility = View.VISIBLE
    }

    companion object {
        const val TAG = "GameEndBottomSheet"
    }
}
