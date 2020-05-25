package ru.inwords.inwords.game.di

import dagger.Module
import dagger.android.ContributesAndroidInjector
import ru.inwords.inwords.game.presentation.custom_game.CustomGameCreatorFragment
import ru.inwords.inwords.game.presentation.game_level.GameEndBottomSheet
import ru.inwords.inwords.game.presentation.game_level.GameLevelFragment
import ru.inwords.inwords.game.presentation.game_levels.GameLevelsFragment
import ru.inwords.inwords.game.presentation.games.GamesFragment
import ru.inwords.inwords.game.presentation.listening.ListeningFragment
import ru.inwords.inwords.game.presentation.listening.ListeningLevelFragment

@Module
abstract class WordSetsAndroidInjectorsModule {
    @ContributesAndroidInjector
    internal abstract fun gameLevelFragmentInjector(): GameLevelFragment

    @ContributesAndroidInjector
    internal abstract fun gameEndBottomSheetInjector(): GameEndBottomSheet

    @ContributesAndroidInjector
    internal abstract fun gameLevelsFragmentInjector(): GameLevelsFragment

    @ContributesAndroidInjector
    internal abstract fun gamesFragmentInjector(): GamesFragment

    @ContributesAndroidInjector
    internal abstract fun customGameCreatorFragmentInjector(): CustomGameCreatorFragment

    @ContributesAndroidInjector
    internal abstract fun customListeningFragmentInjector(): ListeningFragment

    @ContributesAndroidInjector
    internal abstract fun customListeningLevelFragmentInjector(): ListeningLevelFragment
}