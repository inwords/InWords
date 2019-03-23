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
import com.dreamproject.inwords.core.util.SchedulersFacade
import com.dreamproject.inwords.data.dto.game.GameLevelInfo
import com.dreamproject.inwords.domain.GAME_LEVEL_INFO
import com.dreamproject.inwords.domain.util.ColoringUtil
import com.dreamproject.inwords.presentation.viewScenario.FragmentWithViewModelAndNav
import io.reactivex.disposables.CompositeDisposable
import kotlinx.android.synthetic.main.fragment_game_levels.*
import kotlinx.android.synthetic.main.game_level_info.view.*
import kotlinx.android.synthetic.main.game_no_content.*
import javax.inject.Inject

class GameLevelsFragment : FragmentWithViewModelAndNav<GameLevelsViewModel, GameLevelsViewModelFactory>() {
    @Inject
    lateinit var coloringUtil: ColoringUtil
    private val compositeDisposable = CompositeDisposable()

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        compositeDisposable.add(viewModel.navigateToGameLevel
                .subscribe(::navigateToGameLevel))

        compositeDisposable.add(viewModel.screenInfoStream(6)
                .map { it.game.gameLevelInfos }
                .observeOn(SchedulersFacade.ui())
                .subscribe(::renderGameLevelsInfo) {
                    it.printStackTrace()
                    game_no_content.visibility = View.VISIBLE
                    game_content.visibility = View.GONE
                })
    }

    override fun onDestroyView() {
        super.onDestroyView()

        compositeDisposable.clear()
    }

    private fun navigateToGameLevel(gameLevelInfo: GameLevelInfo) {
        val bundle = Bundle()
        bundle.putSerializable(GAME_LEVEL_INFO, gameLevelInfo)
        navController.navigate(R.id.action_gameLevelsFragment_to_gameLevelFragment, bundle)
    }

    private fun renderGameLevelsInfo(gameLevelsInfos: List<GameLevelInfo>) {
        if (!gameLevelsInfos.isEmpty()) {
            game_no_content.visibility = View.GONE
            game_content.visibility = View.VISIBLE
        }

        var counter = 1

        gameLevelsInfos.forEach { gameLevelInfo ->
            layoutInflater.inflate(R.layout.game_level_info, levelsGrid, false).apply {
                //                tag = gameLevelInfo

                title.text = counter.toString()
                counter++

                setBackgroundColor(coloringUtil.getColorForGameLevelInfo(gameLevelInfo.available))

                addStars(stars, gameLevelInfo.playerStars, Color.YELLOW)
                addStars(stars, (if (gameLevelInfo.totalStars > 8) 8 else gameLevelInfo.totalStars) - gameLevelInfo.playerStars, Color.GRAY)
            }.also { view ->
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
