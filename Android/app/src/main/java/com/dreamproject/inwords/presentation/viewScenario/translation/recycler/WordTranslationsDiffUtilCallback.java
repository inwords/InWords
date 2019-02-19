package com.dreamproject.inwords.presentation.viewScenario.translation.recycler;

import com.dreamproject.inwords.core.ObjectsUtil;
import com.dreamproject.inwords.core.SimpleDiffUtilCallback;
import com.dreamproject.inwords.data.dto.WordTranslation;

import java.util.List;

import androidx.annotation.Nullable;

public class WordTranslationsDiffUtilCallback extends SimpleDiffUtilCallback<WordTranslation> {
    public static WordTranslationsDiffUtilCallback create(List<WordTranslation> oldItems,
                                                          List<WordTranslation> newItems) {
        return new WordTranslationsDiffUtilCallback(oldItems, newItems);
    }

    private WordTranslationsDiffUtilCallback(List<WordTranslation> oldWordTranslations, List<WordTranslation> newWordTranslations) {
        super(oldWordTranslations, newWordTranslations);
    }

    @Override
    public boolean areItemsTheSame(WordTranslation oldItem, WordTranslation newItem) {
        return ObjectsUtil.equals(oldItem.getWordNative(), newItem.getWordNative()) &&
                ObjectsUtil.equals(oldItem.getWordForeign(), newItem.getWordForeign());
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
