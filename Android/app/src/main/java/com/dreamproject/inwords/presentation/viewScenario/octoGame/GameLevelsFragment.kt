package com.dreamproject.inwords.presentation.viewScenario.octoGame

import android.graphics.Color
import android.graphics.PorterDuff
import android.os.Bundle
import android.util.TypedValue
import android.view.View
import android.view.ViewGroup
import androidx.annotation.ColorInt
import androidx.core.content.ContextCompat
import com.dreamproject.inwords.R
import com.dreamproject.inwords.domain.ColoringUtil
import com.dreamproject.inwords.domain.GameLevelInfo
import com.dreamproject.inwords.presentation.viewScenario.FragmentWithViewModelAndNav
import io.reactivex.disposables.CompositeDisposable
import kotlinx.android.synthetic.main.fragment_game_levels.*
import kotlinx.android.synthetic.main.game_level_info.view.*

class GameLevelsFragment : FragmentWithViewModelAndNav<GameLevelsViewModel, GameLevelsViewModelFactory>() {
    private val compositeDisposable = CompositeDisposable()

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        compositeDisposable.add(viewModel.navigateToGameLevel
                .subscribe { navController.navigate(R.id.action_gameLevelsFragment_to_gameLevelFragment) })

        compositeDisposable.add(viewModel.screenInfoStream()
                .map { it.gameLevelsInfo }
                .subscribe(::renderGameLevelsInfo))
    }

    override fun onDestroyView() {
        super.onDestroyView()

        compositeDisposable.clear()
    }

    private fun renderGameLevelsInfo(gameLevelsInfo: List<GameLevelInfo>) {
        gameLevelsInfo.forEach { gameLevelInfo ->
            layoutInflater.inflate(R.layout.game_level_info, levelsGrid, false).apply {
                //                tag = gameLevelInfo

                title.text = gameLevelInfo.title

                setBackgroundColor(ColoringUtil
                        .getColorForGameLevelInfo(gameLevelInfo.color, gameLevelInfo.available))

                addStars(stars, gameLevelInfo.stars, Color.YELLOW)
                addStars(stars, gameLevelInfo.maxStars - gameLevelInfo.stars, Color.GRAY)
            }.let { view ->
                view.setOnClickListener { viewModel.onGameLevelSelected(gameLevelInfo) }
                levelsGrid.addView(view)
            }
        }
    }

    private fun addStars(stars: ViewGroup, count: Int, @ColorInt color: Int) {
        val size = TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 12.0f, resources.displayMetrics).toInt()

        for (i: Int in 1..count) {
            stars.addView(View(context).apply {
                layoutParams = ViewGroup.LayoutParams(size, size)
                val star = ContextCompat.getDrawable(context, R.drawable.ic_star_black_24dp)
                star?.setColorFilter(color, PorterDuff.Mode.SRC_ATOP).let { background = star }
            })
        }
    }

    override fun getLayout() = R.layout.fragment_game_levels

    override fun getClassType() = GameLevelsViewModel::class.java
}
