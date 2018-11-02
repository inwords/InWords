package com.dreamproject.inwords.viewScenario.octoGame;


import android.support.annotation.NonNull;

import com.dreamproject.inwords.R;
import com.dreamproject.inwords.viewScenario.FragmentWithViewModelAndNav;

public class GameLevelsFragment extends FragmentWithViewModelAndNav<GameLevelsViewModel, GameLevelsViewModelFactory> {
    public GameLevelsFragment() {
        // Required empty public constructor
    }

    @Override
    protected int getLayout() {
        return R.layout.fragment_game_levels;
    }

    @NonNull
    @Override
    protected Class<GameLevelsViewModel> getClassType() {
        return GameLevelsViewModel.class;
    }
}
