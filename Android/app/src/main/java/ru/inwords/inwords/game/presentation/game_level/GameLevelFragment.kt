package ru.inwords.inwords.game.presentation.game_level

import android.os.Bundle
import android.view.View
import androidx.navigation.fragment.navArgs
import kotlinx.android.synthetic.main.fragment_game_level.*
import ru.inwords.inwords.R
import ru.inwords.inwords.core.Event
import ru.inwords.inwords.game.data.bean.GameLevelInfo
import ru.inwords.inwords.game.domain.model.LevelResultModel
import ru.inwords.inwords.game.presentation.OctoGameViewModelFactory
import ru.inwords.inwords.presentation.GAME_LEVEL_INFO
import ru.inwords.inwords.presentation.view_scenario.FragmentWithViewModelAndNav
import java.lang.ref.WeakReference


class GameLevelFragment : FragmentWithViewModelAndNav<GameLevelViewModel, OctoGameViewModelFactory>() {
    override val layout = R.layout.fragment_game_level
    override val classType = GameLevelViewModel::class.java

    private val args by navArgs<GameLevelFragmentArgs>()

    //region arguments
    private lateinit var gameLevelInfo: GameLevelInfo
    //endregion arguments

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        gameLevelInfo = savedInstanceState?.getParcelable(GAME_LEVEL_INFO) ?: args.gameLevelInfo

        viewModel.onGameLevelSelected(args.gameId, gameLevelInfo)
    }

    override fun onSaveInstanceState(outState: Bundle) {
        viewModel.getCurrentLevelInfo()?.let { outState.putParcelable(GAME_LEVEL_INFO, it) }
        super.onSaveInstanceState(outState)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        viewModel.levelResult.observe(this::getLifecycle, this::showGameEndDialog)
        viewModel.onAttachGameScene(GameScene(WeakReference(table)))
    }

    private fun showGameEndDialog(levelResultEvent: Event<LevelResultModel>) {
        val levelResultModel = levelResultEvent.contentIfNotHandled ?: return
        val levelId = viewModel.getCurrentLevelInfo()?.levelId ?: return

        navController.navigate(GameLevelFragmentDirections.actionGameLevelFragmentToGameEndBottomSheet(
            levelResultModel.copy(levelId = levelId)
        ))
    }
}