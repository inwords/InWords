package ru.inwords.inwords.presentation.viewScenario.octoGame.gameLevel

import android.content.Context
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.view.ContextThemeWrapper
import androidx.lifecycle.ViewModelProviders
import com.google.android.material.bottomsheet.BottomSheetDialogFragment
import io.reactivex.disposables.CompositeDisposable
import kotlinx.android.synthetic.main.game_end.*
import ru.inwords.inwords.R
import ru.inwords.inwords.core.util.SchedulersFacade
import ru.inwords.inwords.data.dto.game.LevelScore
import ru.inwords.inwords.domain.LEVEL_ID
import ru.inwords.inwords.domain.NEXT_LEVEL_AVAILABLE
import ru.inwords.inwords.domain.model.Resource
import ru.inwords.inwords.presentation.viewScenario.octoGame.OctoGameViewModelFactory
import javax.inject.Inject

class GameEndBottomSheet private constructor() : BottomSheetDialogFragment() {
    private val compositeDisposable = CompositeDisposable()
    private var levelId: Int = -1
    private var nextLevelAvailable: Boolean = false

    @Inject
    internal lateinit var modelFactory: OctoGameViewModelFactory
    private lateinit var viewModel: GameLevelViewModel

    override fun onAttach(context: Context?) {
        super.onAttach(context)
        viewModel = ViewModelProviders.of(parentFragment!!, modelFactory).get(GameLevelViewModel::class.java)

        arguments?.getInt(LEVEL_ID)?.also { levelId = it }
        arguments?.getBoolean(NEXT_LEVEL_AVAILABLE)?.also { nextLevelAvailable = it }
    }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        val contextThemeWrapper = ContextThemeWrapper(activity, R.style.AppTheme) //needed to render this dialog with correct theme
        return inflater.cloneInContext(contextThemeWrapper).inflate(R.layout.game_end, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        compositeDisposable.add(viewModel.scoreStream()
                .startWith(Resource.loading<LevelScore>(null))
                .observeOn(SchedulersFacade.ui())
                .subscribe {
                    when (it.status) {
                        Resource.Status.SUCCESS -> showSuccess(it.data!!)
                        Resource.Status.LOADING -> showLoading()
                        Resource.Status.ERROR -> showError()
                    }
                })

        setupView()
    }

    override fun onDetach() {
        compositeDisposable.dispose()
        super.onDetach()
    }

    private fun setupView() {
        button_home.setOnClickListener { viewModel.onNewNavCommand(FromGameEndPathsEnum.HOME) }
        button_back.setOnClickListener { viewModel.onNewNavCommand(FromGameEndPathsEnum.BACK) }
        button_next.setOnClickListener { viewModel.onNewNavCommand(FromGameEndPathsEnum.NEXT) }
        button_retry.setOnClickListener { viewModel.onNewNavCommand(FromGameEndPathsEnum.REFRESH) }

        if (nextLevelAvailable) {
            button_next.visibility = View.VISIBLE
        } else {
            button_next.visibility = View.GONE
        }
    }

    private fun showSuccess(levelScore: LevelScore) {
        if (levelScore.levelId == levelId || levelId == -1) {
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
        fun instantiate(levelId: Int, nextLevelAvailable: Boolean): GameEndBottomSheet {
            val bundle = Bundle()
            bundle.putInt(LEVEL_ID, levelId)
            bundle.putBoolean(NEXT_LEVEL_AVAILABLE, nextLevelAvailable)

            val fragment = GameEndBottomSheet()
            fragment.arguments = bundle

            return fragment
        }
    }
}
