package ru.inwords.inwords.game.presentation.game_level

import android.view.LayoutInflater
import android.widget.TableLayout
import android.widget.TableRow
import android.widget.TextView
import io.mockk.*
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test
import ru.inwords.flipview.FlipView
import ru.inwords.inwords.R
import ru.inwords.inwords.game.domain.CardsData
import ru.inwords.inwords.translation.domain.model.WordTranslation
import java.lang.ref.WeakReference

internal class GameSceneTest {

    private val tableLayout = mockk<TableLayout>(relaxed = true)

    private val gameScene = GameScene(WeakReference(tableLayout))

    @Test
    fun `setState when no views should do nothing`() {
        gameScene.setState(GameLevelOrchestrator.FlipState(listOf(true, true)))
    }

    @Test
    fun clearState() {
        every { tableLayout.removeAllViews() } just runs

        gameScene.clearState()

        assertTrue(gameScene.getFlipViews().isEmpty())
        verifyAll {
            tableLayout.removeAllViews()
        }
    }

    @Test
    fun renderCards() {
        every { tableLayout.removeAllViews() } just runs
        every { tableLayout.measuredHeight } returns 1920
        every { tableLayout.measuredWidth } returns 1080
        every { tableLayout.measuredWidth } returns 1080

        mockkConstructor(TableRow::class)
        every { anyConstructed<TableRow>().layoutParams = any() } just runs
        every { anyConstructed<TableRow>().gravity = any() } just runs
        every { anyConstructed<TableRow>().addView(any(), any<Int>()) } just runs

        val flipViews = listOf<FlipView>(mockk(relaxed = true), mockk(relaxed = true), mockk(relaxed = true), mockk(relaxed = true))
        flipViews.forEach { f ->
            every { f.findViewById<FlipView>(R.id.flip_view) } returns f
            every { f.frontLayout } returns mockk<TextView>(relaxed = true)
        }

        val layoutInflater = mockk<LayoutInflater>()
        mockkStatic(LayoutInflater::class)
        every { LayoutInflater.from(any()) } returns layoutInflater
        every { layoutInflater.inflate(any<Int>(), any(), any()) } returnsMany flipViews

        gameScene.renderCards(
            CardsData(
                listOf(
                    WordTranslation("f1", "n1"),
                    WordTranslation("f2", "n2")
                )
            ),
            GameLevelOrchestrator.FlipState(listOf(false, false, false, false))
        )

        verify {
            flipViews[0].flip(true)
            flipViews[1].flip(true)
            flipViews[2].flip(true)
            flipViews[3].flip(true)
        }

        verify {
            tableLayout.addView(any(), 0)
            tableLayout.addView(any(), 1)
        }
    }
}