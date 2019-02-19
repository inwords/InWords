package com.dreamproject.inwords.presentation.viewScenario.octoGame.gameLevel

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.dreamproject.inwords.R
import com.dreamproject.inwords.domain.BundleKeys
import com.dreamproject.inwords.domain.GameLevelInfo
import kotlinx.android.synthetic.main.fragment_game_level.*

class GameLevelFragment : Fragment() {
    private lateinit var gameLevelInfo: GameLevelInfo

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        gameLevelInfo = arguments?.getSerializable(BundleKeys.GAME_LEVEL_INFO) as GameLevelInfo
    }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_game_level, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        text.text = gameLevelInfo.toString()
    }
}
