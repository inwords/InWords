package com.dreamproject.inwords.viewScenario.translation.recycler;

import android.support.annotation.Nullable;
import android.support.v7.util.DiffUtil;

import com.dreamproject.inwords.data.entity.WordTranslation;

import java.util.List;

public class WordTranslationsDiffUtilCallback extends DiffUtil.Callback {

    private List<WordTranslation> oldWordTranslations;
    private List<WordTranslation> newWordTranslations;

    public WordTranslationsDiffUtilCallback(List<WordTranslation> newWordTranslations, List<WordTranslation> oldWordTranslations) {
        this.newWordTranslations = newWordTranslations;
        this.oldWordTranslations = oldWordTranslations;
    }

    @Override
    public int getOldListSize() {
        return oldWordTranslations.size();
    }

    @Override
    public int getNewListSize() {
        return newWordTranslations.size();
    }

    @Override
    public boolean areItemsTheSame(int oldItemPosition, int newItemPosition) {
        return oldWordTranslations.get(oldItemPosition).getWordNative().equals(newWordTranslations.get(newItemPosition).getWordNative());
    }

    @Override
    public boolean areContentsTheSame(int oldItemPosition, int newItemPosition) {
        return oldWordTranslations.get(oldItemPosition).equals(newWordTranslations.get(newItemPosition));
    }

    @Nullable
    @Override
    public Object getChangePayload(int oldItemPosition, int newItemPosition) {
        //you can return particular field for changed item.
        return super.getChangePayload(oldItemPosition, newItemPosition);
    }

}
