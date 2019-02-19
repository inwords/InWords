package com.dreamproject.inwords.presentation.viewScenario.octoGame

import android.graphics.Color
import android.graphics.PorterDuff
import android.os.Bundle
import android.util.TypedValue
import android.view.View
import android.view.ViewGroup
import androidx.core.content.ContextCompat
import com.dreamproject.inwords.R
import com.dreamproject.inwords.core.ColorUtil
import com.dreamproject.inwords.domain.GameLevelInfo
import com.dreamproject.inwords.domain.GameLevelsScreenInfo
import com.dreamproject.inwords.presentation.viewScenario.FragmentWithViewModelAndNav
import kotlinx.android.synthetic.main.fragment_game_levels.*
import kotlinx.android.synthetic.main.game_level_info.view.*

class GameLevelsFragment : FragmentWithViewModelAndNav<GameLevelsViewModel, GameLevelsViewModelFactory>() {
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val (shouldShowIntro, gameLevelsInfo) = GameLevelsScreenInfo(false, arrayListOf(
                GameLevelInfo("Introduction", "0x225465", 2, 3, 3, true, 0),
                GameLevelInfo("Beginning", "0x225465", 0, 3, 3, true, 0),
                GameLevelInfo("Super level", "0x225465", 5, 3, 5, true, 0),
                GameLevelInfo("Extra notes", "0x225465", 2, 3, 5, true, 0)))

        gameLevelsInfo.forEach { gameLevelInfo ->
            layoutInflater.inflate(R.layout.game_level_info, levelsGrid, false).apply {
                tag = gameLevelInfo

                title.text = gameLevelInfo.title

                setBackgroundColor(ColorUtil.decodeColor(gameLevelInfo.color))

                val size = TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 12.0f, resources.displayMetrics).toInt()

                for (i: Int in 1..gameLevelInfo.stars) {
                    stars.addView(View(context).apply {
                        layoutParams = ViewGroup.LayoutParams(size, size)
                        val star = ContextCompat.getDrawable(context, R.drawable.ic_star_black_24dp)
                        star?.setColorFilter(Color.YELLOW, PorterDuff.Mode.SRC_ATOP).let { background = star }
                    })
                }
            }.let { view ->
                view.setOnClickListener { System.out.println(gameLevelInfo.toString()) }
                levelsGrid.addView(view)
            }
        }
    }

    override fun getLayout(): Int {
        return R.layout.fragment_game_levels
    }

    override fun getClassType(): Class<GameLevelsViewModel> {
        return GameLevelsViewModel::class.java
    }
}
