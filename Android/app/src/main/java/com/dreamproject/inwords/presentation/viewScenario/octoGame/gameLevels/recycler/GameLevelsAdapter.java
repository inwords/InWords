package com.dreamproject.inwords.presentation.viewScenario.octoGame.gameLevels.recycler;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.dreamproject.inwords.R;
import com.dreamproject.inwords.data.dto.game.GameLevelInfo;
import com.dreamproject.inwords.presentation.viewScenario.octoGame.BaseSingleTypeAdapter;

import androidx.annotation.NonNull;
import io.reactivex.subjects.PublishSubject;

public class GameLevelsAdapter extends BaseSingleTypeAdapter<GameLevelInfo, GameLevelViewHolder> {
    public GameLevelsAdapter(LayoutInflater layoutInflater,
                             PublishSubject<GameLevelInfo> onItemClickedListener) {
        super(layoutInflater, onItemClickedListener);
    }

    @NonNull
    @Override
    public GameLevelViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = inflater.inflate(R.layout.game_level_info, parent, false);

        return new GameLevelViewHolder(v, onItemClickedListener);
    }

    @Override
    public void onBindViewHolder(@NonNull final GameLevelViewHolder holder, int position) {
        GameLevelInfo gameLevelInfo = values.get(position);
        holder.bind(gameLevelInfo);
    }
}
