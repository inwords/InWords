package com.dreamproject.inwords.presentation.viewScenario.octoGame;


import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.GridLayout;

import com.dreamproject.inwords.R;
import com.dreamproject.inwords.presentation.viewScenario.FragmentWithViewModelAndNav;

public class GameLevelsFragment extends FragmentWithViewModelAndNav<GameLevelsViewModel, GameLevelsViewModelFactory> {
    public GameLevelsFragment() {
        // Required empty public constructor
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        GridLayout levelsGrid = view.findViewById(R.id.levelsGrid);

        View v = LayoutInflater.from(getContext()).inflate(R.layout.game_level_info, levelsGrid, false);
        levelsGrid.addView(v);
        Button btn = new Button(getContext());
        btn.setText("asdasd");
        levelsGrid.addView(btn);
        btn = new Button(getContext());
        btn.setText("asdasd");
        levelsGrid.addView(btn);
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
