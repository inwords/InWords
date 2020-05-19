package ru.inwords.inwords.game.di

import dagger.Binds
import dagger.Module
import ru.inwords.inwords.game.data.repository.GameGatewayController
import ru.inwords.inwords.game.data.repository.GameGatewayControllerImpl

@Module
abstract class WordSetsAbstractModule {
    @Binds
    abstract fun gameGatewayController(gameGatewayController: GameGatewayControllerImpl): GameGatewayController
}