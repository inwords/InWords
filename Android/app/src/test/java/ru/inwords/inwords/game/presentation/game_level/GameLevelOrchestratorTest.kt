package ru.inwords.inwords.game.presentation.game_level

import io.mockk.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import ru.inwords.inwords.game.domain.model.CardsData
import ru.inwords.inwords.game.domain.model.WordModel
import ru.inwords.inwords.game.presentation.game_level.GameLevelOrchestrator.FlipState
import ru.inwords.inwords.translation.domain.model.WordTranslation

internal class GameLevelOrchestratorTest {

    private val callback = mockk<(WordModel) -> Unit>(relaxed = true)

    private val gameLevelOrchestrator = spyk(GameLevelOrchestrator(callback))
    private val gameScene = mockk<GameScene>(relaxed = true)

    @Test
    fun attachGameScene() {
        gameLevelOrchestrator.attachGameScene(gameScene)

        verifyAll {
            gameScene.setOnClickListener(any())
            gameScene.setState(any())
        }
    }

    @Test
    fun updateGameScene() {
        assertThrows<IllegalArgumentException> {
            gameLevelOrchestrator.updateGameScene(CardsData(emptyList()))
        }

        val slot = slot<(GameScene.ClickEvent) -> Unit>()
        every { gameScene.setOnClickListener(capture(slot)) } just runs
        every { gameScene.postDelayed(any(), captureLambda()) } answers {
            lambda<() -> Unit>()
            true
        }

        attachGameScene()

        val data = CardsData(
            listOf(
                WordTranslation("f1", "n1", 1, 1),
                WordTranslation("f2", "n2", 2, 2)
            )
        )

        gameLevelOrchestrator.updateGameScene(data)
        verify(exactly = 1) { gameScene.clearState() }
        verify(exactly = 1) { gameScene.renderCards(data, FlipState(listOf(false, false, false, false))) }

        val gameEndListener = mockk<(HashMap<WordModel, Int>) -> Unit>()
        every { gameEndListener.invoke(any()) } just runs
        gameLevelOrchestrator.setGameEndListener(gameEndListener)

        repeat(4) { index ->
            slot.captured.invoke(GameScene.ClickEvent(index, data.words[index]))
            verify { callback.invoke(match { it in data.words }) }
        }
        verify(exactly = 4) { gameScene.setState(any()) }
        verify(exactly = 4) { gameScene.cardsData }

        excludeRecords { gameScene.postDelayed(any(), any()) }
//        verifyAll { gameEndListener.invoke(LevelResultModel(0, hashMapOf())) }
        confirmVerified(gameEndListener, gameScene)
    }
}