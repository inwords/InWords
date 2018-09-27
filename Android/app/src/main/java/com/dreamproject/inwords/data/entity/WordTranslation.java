package com.dreamproject.inwords.data.entity;

import android.arch.persistence.room.ColumnInfo;
import android.arch.persistence.room.Entity;
import android.arch.persistence.room.Ignore;
import android.arch.persistence.room.Index;
import android.arch.persistence.room.PrimaryKey;
import android.support.annotation.NonNull;

import java.util.Objects;

@Entity(tableName = "word_translation_table",
        indices = {@Index("word_native")})
public class WordTranslation {
    @PrimaryKey(autoGenerate = true)
    @ColumnInfo(name = "id")
    private int id;

    @NonNull
    @ColumnInfo(name = "word_foreign")
    private String wordForeign;

    @NonNull
    @ColumnInfo(name = "word_native")
    private String wordNative;

    @ColumnInfo(name = "server_id")
    private int serverId;

    @Ignore
    public WordTranslation(@NonNull String wordForeign, @NonNull String wordNative) {
        this.wordForeign = wordForeign;
        this.wordNative = wordNative;
        this.serverId = 0;
    }

    public WordTranslation(int id, @NonNull String wordForeign, @NonNull String wordNative, int serverId) {
        this.id = id;
        this.wordForeign = wordForeign;
        this.wordNative = wordNative;
        this.serverId = serverId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public int getServerId() {
        return serverId;
    }

    public void setServerId(int serverId) {
        this.serverId = serverId;
    }

    public boolean equalsActual(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        WordTranslation that = (WordTranslation) o;
        return wordForeign.equals(that.wordForeign) &&
                wordNative.equals(that.wordNative);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        WordTranslation that = (WordTranslation) o;
        return id == that.id &&
                serverId == that.serverId &&
                wordForeign.equals(that.wordForeign) &&
                wordNative.equals(that.wordNative);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, wordForeign, wordNative, serverId);
    }
}
