package com.dreamproject.inwords.data.entity;

import android.arch.persistence.room.ColumnInfo;
import android.arch.persistence.room.Entity;
import android.arch.persistence.room.Ignore;
import android.arch.persistence.room.Index;
import android.support.annotation.NonNull;

import java.util.Objects;

@Entity(tableName = "word_translation_table",
        indices = {
                @Index(value = {"word_foreign", "word_native"}, unique = true)
        })
public class WordTranslation extends WordIdentificator {
    @NonNull
    @ColumnInfo(name = "word_foreign")
    private String wordForeign;

    @NonNull
    @ColumnInfo(name = "word_native")
    private String wordNative;

    @Ignore
    public WordTranslation(@NonNull String wordForeign, @NonNull String wordNative) {
        super();
        this.wordForeign = wordForeign;
        this.wordNative = wordNative;
    }

    @Ignore
    public WordTranslation(WordIdentificator wordIdentificator, @NonNull String wordForeign, @NonNull String wordNative) {
        super(wordIdentificator);
        this.wordForeign = wordForeign;
        this.wordNative = wordNative;
    }

    public WordTranslation(int id, int serverId, @NonNull String wordForeign, @NonNull String wordNative) {
        super(id, serverId);
        this.wordForeign = wordForeign;
        this.wordNative = wordNative;
    }

    public void markRemoteDeleted() {
        serverId = -serverId; //minus
    }

    public boolean isRemoteDeleted() {
        return serverId < 0 && !isLocallyDeleted();
    }

    public void markLocallyDeleted() {
        serverId = Integer.MIN_VALUE;
    }

    public boolean isLocallyDeleted() {
        return serverId == Integer.MIN_VALUE;
    }

    public WordIdentificator getWordIdentificator() {
        return this; //TODO
    }

    @NonNull
    public String getWordForeign() {
        return wordForeign;
    }

    public void setWordForeign(@NonNull String wordForeign) {
        this.wordForeign = wordForeign;
    }

    @NonNull
    public String getWordNative() {
        return wordNative;
    }

    public void setWordNative(@NonNull String wordNative) {
        this.wordNative = wordNative;
    }

    @NonNull
    @Override
    public String toString() {
        return "WordTranslation{" +
                "id=" + id +
                ", sId=" + serverId +
                ", wf='" + wordForeign + '\'' +
                ", wn='" + wordNative + '\'' +
                "}\n";
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        WordTranslation that = (WordTranslation) o;
        return wordForeign.equals(that.wordForeign) &&
                wordNative.equals(that.wordNative);
    }

    @Override
    public int hashCode() {
        return Objects.hash(wordForeign, wordNative);
    }
}
