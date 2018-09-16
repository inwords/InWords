package com.dreamproject.inwords.data.entity;

import android.arch.persistence.room.Entity;
import android.arch.persistence.room.PrimaryKey;
import android.support.annotation.NonNull;

import java.util.Objects;

@Entity(tableName = "word_translation_table")
public class WordTranslation {
    @PrimaryKey
    @NonNull
    private String wordForeign;
    private String wordNative;

    public WordTranslation(@NonNull String wordForeign, String wordNative) {
        this.wordForeign = wordForeign;
        this.wordNative = wordNative;
    }

    public String getWordForeign() {
        return this.wordForeign;
    }

    public String getWordNative() {
        return this.wordNative;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        WordTranslation that = (WordTranslation) o;
        return Objects.equals(wordForeign, that.wordForeign) &&
                Objects.equals(wordNative, that.wordNative);
    }

    @Override
    public int hashCode() {
        return Objects.hash(wordForeign, wordNative);
    }
}
