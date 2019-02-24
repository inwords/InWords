package com.dreamproject.inwords.data.sync;

import com.dreamproject.inwords.data.dto.WordTranslation;
import com.google.gson.annotations.SerializedName;

import java.util.List;

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
