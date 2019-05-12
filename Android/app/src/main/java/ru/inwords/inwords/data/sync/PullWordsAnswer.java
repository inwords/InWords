package ru.inwords.inwords.data.sync;

import com.google.gson.annotations.SerializedName;

import java.util.List;

import ru.inwords.inwords.data.dto.WordTranslation;

public class PullWordsAnswer {
    @SerializedName("removedServerIds")
    private List<Integer> removedServerIds;
    @SerializedName("addedWords")
    private List<WordTranslation> addedWords;

    public PullWordsAnswer(List<Integer> removedServerIds, List<WordTranslation> addedWords) {
        this.removedServerIds = removedServerIds;
        this.addedWords = addedWords;
    }

    List<Integer> getRemovedServerIds() {
        return removedServerIds;
    }

    List<WordTranslation> getAddedWords() {
        return addedWords;
    }
}
