package ru.inwords.inwords.presentation.viewScenario.translation.recycler;

import androidx.annotation.Nullable;

import java.util.List;

import ru.inwords.inwords.core.ObjectsUtil;
import ru.inwords.inwords.core.SimpleDiffUtilCallback;
import ru.inwords.inwords.data.dto.WordTranslation;

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
