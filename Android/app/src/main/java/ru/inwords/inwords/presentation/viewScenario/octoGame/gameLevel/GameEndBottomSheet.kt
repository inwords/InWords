package ru.inwords.inwords.presentation.viewScenario.octoGame.gameLevel

import android.content.Context
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.view.ContextThemeWrapper
import androidx.core.os.bundleOf
import androidx.lifecycle.ViewModelProviders
import com.google.android.material.bottomsheet.BottomSheetDialogFragment
import io.reactivex.disposables.CompositeDisposable
import kotlinx.android.synthetic.main.game_end.*
import ru.inwords.inwords.R
import ru.inwords.inwords.core.util.SchedulersFacade
import ru.inwords.inwords.data.dto.game.LevelScore
import ru.inwords.inwords.domain.CARDS_COUNT
import ru.inwords.inwords.domain.CARD_OPEN_CLICKS_COUNT
import ru.inwords.inwords.domain.LEVEL_ID
import ru.inwords.inwords.domain.model.Resource
import ru.inwords.inwords.domain.util.INVALID_ID
import ru.inwords.inwords.domain.util.validId
import ru.inwords.inwords.presentation.viewScenario.octoGame.OctoGameViewModelFactory
import javax.inject.Inject

class GameEndBottomSheet private constructor() : BottomSheetDialogFragment() {
    private val compositeDisposable = CompositeDisposable()
    private var levelId: Int = INVALID_ID

    private var cardOpenClicksCount: Int = 0
    private var cardsCount: Int = 0

    @Inject
    internal lateinit var modelFactory: OctoGameViewModelFactory
    private lateinit var viewModel: GameLevelViewModel

    override fun onAttach(context: Context?) {
        super.onAttach(context)
        viewModel = ViewModelProviders.of(parentFragment!!, modelFactory).get(GameLevelViewModel::class.java)

        arguments?.getInt(LEVEL_ID)?.also { levelId = it }

        arguments?.getInt(CARD_OPEN_CLICKS_COUNT)?.also { cardOpenClicksCount = it }
        arguments?.getInt(CARDS_COUNT)?.also { cardsCount = it }
    }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        val contextThemeWrapper = ContextThemeWrapper(activity, R.style.AppTheme) //needed to render this dialog with correct theme
        return inflater.cloneInContext(contextThemeWrapper).inflate(R.layout.game_end, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        compositeDisposable.add(viewModel.getScore(cardOpenClicksCount, cardsCount)
                .toObservable()
                .startWith(Resource.loading<LevelScore>(null))
                .observeOn(SchedulersFacade.ui())
                .subscribe {
                    Log.d(TAG, it.toString())

                    when (it.status) {
                        Resource.Status.SUCCESS -> showSuccess(it.data!!)
                        Resource.Status.LOADING -> showLoading()
                        Resource.Status.ERROR -> showError()
                    }
                })

        setupView(viewModel.getNextLevelInfo().success())
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
        if (levelScore.levelId == levelId || !validId(levelId)) {
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
        fun instance(levelId: Int, cardOpenClicksCount: Int, cardsCount: Int): GameEndBottomSheet {
            return GameEndBottomSheet().apply {
                arguments = bundleOf(
                        LEVEL_ID to levelId,
                        CARD_OPEN_CLICKS_COUNT to cardOpenClicksCount,
                        CARDS_COUNT to cardsCount)
            }
        }

        const val TAG = "GameEndBottomSheet"
    }
}
