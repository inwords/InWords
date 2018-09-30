package com.dreamproject.inwords.data.sync;

import com.dreamproject.inwords.data.entity.WordTranslation;
import com.google.gson.annotations.SerializedName;

import java.util.List;

public class PresyncServerAnswer {
    @SerializedName("server_ids")
    private List<Integer> removedServerIds;
    @SerializedName("words")
    private List<WordTranslation> addedWords;

    public PresyncServerAnswer(List<Integer> removedServerIds, List<WordTranslation> addedWords) {
        this.removedServerIds = removedServerIds;
        this.addedWords = addedWords;
    }

    public List<Integer> getRemovedServerIds() {
        return removedServerIds;
    }

    public void setRemovedServerIds(List<Integer> removedServerIds) {
        this.removedServerIds = removedServerIds;
    }

    public List<WordTranslation> getAddedWords() {
        return addedWords;
    }

    public void setAddedWords(List<WordTranslation> addedWords) {
        this.addedWords = addedWords;
    }
}
