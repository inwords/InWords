package com.dreamproject.inwords.presentation.viewScenario.octoGame.gameLevels

import android.content.Context
import android.os.Bundle
import android.view.View
import androidx.recyclerview.widget.GridLayoutManager
import com.dreamproject.inwords.R
import com.dreamproject.inwords.core.RxDiffUtil
import com.dreamproject.inwords.core.util.SchedulersFacade
import com.dreamproject.inwords.data.dto.game.GameInfo
import com.dreamproject.inwords.data.dto.game.GameLevelInfo
import com.dreamproject.inwords.domain.GAME_INFO
import com.dreamproject.inwords.domain.GAME_LEVEL_INFO
import com.dreamproject.inwords.presentation.viewScenario.FragmentWithViewModelAndNav
import com.dreamproject.inwords.presentation.viewScenario.octoGame.gameLevels.recycler.GameLevelsAdapter
import com.dreamproject.inwords.presentation.viewScenario.octoGame.gameLevels.recycler.GameLevelsDiffUtilCallback
import io.reactivex.subjects.PublishSubject
import kotlinx.android.synthetic.main.fragment_game_levels.*
import kotlinx.android.synthetic.main.game_no_content.*

class GameLevelsFragment : FragmentWithViewModelAndNav<GameLevelsViewModel, GameLevelsViewModelFactory>() {
    private lateinit var gameInfo: GameInfo
    private lateinit var adapter: GameLevelsAdapter

    override fun onAttach(context: Context?) {
        super.onAttach(context)

        gameInfo = arguments?.getSerializable(GAME_INFO) as GameInfo

        val onItemClickedListener = PublishSubject.create<GameLevelInfo>()
        compositeDisposable.add(onItemClickedListener.subscribe { viewModel.onGameLevelSelected(it) })
        adapter = GameLevelsAdapter(layoutInflater, onItemClickedListener)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        levelsRecycler.layoutManager = GridLayoutManager(context, 3)
        levelsRecycler.adapter = adapter

        compositeDisposable.add(viewModel.navigateToGameLevel
                .subscribe(::navigateToGameLevel))

        compositeDisposable.add(viewModel.screenInfoStream(gameInfo.gameId)
                .map { it.game.gameLevelInfos }
                .observeOn(SchedulersFacade.ui())
                .doOnNext(::renderScreenState)
                .observeOn(SchedulersFacade.computation())
                .compose(RxDiffUtil.calculate(GameLevelsDiffUtilCallback.Companion::create))
                .observeOn(SchedulersFacade.ui())
                .subscribe(adapter::accept) {
                    it.printStackTrace()
                    game_no_content.visibility = View.VISIBLE
                    game_content.visibility = View.GONE
                })
    }

    private fun navigateToGameLevel(gameLevelInfo: GameLevelInfo) {
        val bundle = Bundle()
        bundle.putSerializable(GAME_LEVEL_INFO, gameLevelInfo)
        navController.navigate(R.id.action_gameLevelsFragment_to_gameLevelFragment, bundle)
    }

    private fun renderScreenState(gameLevelsInfos: List<GameLevelInfo>) {
        if (!gameLevelsInfos.isEmpty()) {
            game_no_content.visibility = View.GONE
            game_content.visibility = View.VISIBLE
        }
    }

    override fun getLayout() = R.layout.fragment_game_levels

    override fun getClassType() = GameLevelsViewModel::class.java
}
