package ru.inwords.inwords.presentation.view_scenario.octo_game

import dagger.Module
import dagger.android.ContributesAndroidInjector
import ru.inwords.inwords.presentation.view_scenario.octo_game.gameLevel.GameEndBottomSheet
import ru.inwords.inwords.presentation.view_scenario.octo_game.gameLevel.GameLevelFragment
import ru.inwords.inwords.presentation.view_scenario.octo_game.gameLevels.GameLevelsFragment
import ru.inwords.inwords.presentation.view_scenario.octo_game.games.GamesFragment

@Module
abstract class OctoGameDaggerModule {
    @ContributesAndroidInjector
    internal abstract fun gameLevelFragmentInjector(): GameLevelFragment

    @ContributesAndroidInjector
    internal abstract fun gameEndBottomSheetInjector(): GameEndBottomSheet

    @ContributesAndroidInjector
    internal abstract fun gameLevelsFragmentInjector(): GameLevelsFragment

    @ContributesAndroidInjector
    internal abstract fun gamesFragmentInjector(): GamesFragment
}