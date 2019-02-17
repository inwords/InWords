package com.dreamproject.inwords.viewScenario.translation.recycler;

import android.support.annotation.Nullable;

import com.dreamproject.inwords.core.ObjectsUtil;
import com.dreamproject.inwords.core.SimpleDiffUtilCallback;
import com.dreamproject.inwords.data.entity.WordTranslation;

import java.util.List;

public class WordTranslationsDiffUtilCallback extends SimpleDiffUtilCallback<WordTranslation> {
    public static WordTranslationsDiffUtilCallback create(List<WordTranslation> oldItems,
                                                          List<WordTranslation> newItems) {
        return new WordTranslationsDiffUtilCallback(oldItems, newItems);
    }

    public WordTranslationsDiffUtilCallback(List<WordTranslation> newWordTranslations, List<WordTranslation> oldWordTranslations) {
        super(oldWordTranslations, newWordTranslations);
    }

    @Override
    public boolean areItemsTheSame(WordTranslation oldItem, WordTranslation newItem) {
        return ObjectsUtil.equals(oldItem.getWordNative(), newItem.getWordNative());
    }

    @Override
    protected boolean areContentsTheSame(WordTranslation oldItem, WordTranslation newItem) {
        return ObjectsUtil.equals(oldItem, newItem);
    }

    @Nullable
    @Override
    public Object getChangePayload(int oldItemPosition, int newItemPosition) {
        //you can return particular field for changed item.
        return super.getChangePayload(oldItemPosition, newItemPosition);
    }

}
