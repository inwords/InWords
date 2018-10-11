package com.dreamproject.inwords.viewScenario.translation.recycler;

import android.support.annotation.Nullable;
import android.support.v7.util.DiffUtil;

import com.dreamproject.inwords.data.entity.WordTranslation;

import java.util.List;

public class WordTranslationsDiffUtilCallback extends DiffUtil.Callback {

    private List<WordTranslation> oldWordTranslationsPersons;
    private List<WordTranslation> newWordTranslationsPersons;

    public WordTranslationsDiffUtilCallback(List<WordTranslation> newWordTranslationsPersons, List<WordTranslation> oldWordTranslationsPersons) {
        this.newWordTranslationsPersons = newWordTranslationsPersons;
        this.oldWordTranslationsPersons = oldWordTranslationsPersons;
    }

    @Override
    public int getOldListSize() {
        return oldWordTranslationsPersons.size();
    }

    @Override
    public int getNewListSize() {
        return newWordTranslationsPersons.size();
    }

    @Override
    public boolean areItemsTheSame(int oldItemPosition, int newItemPosition) {
        return oldWordTranslationsPersons.get(oldItemPosition).getWordNative().equals(newWordTranslationsPersons.get(newItemPosition).getWordNative());
    }

    @Override
    public boolean areContentsTheSame(int oldItemPosition, int newItemPosition) {
        return oldWordTranslationsPersons.get(oldItemPosition).equals(newWordTranslationsPersons.get(newItemPosition));
    }

    @Nullable
    @Override
    public Object getChangePayload(int oldItemPosition, int newItemPosition) {
        //you can return particular field for changed item.
        return super.getChangePayload(oldItemPosition, newItemPosition);
    }

}
