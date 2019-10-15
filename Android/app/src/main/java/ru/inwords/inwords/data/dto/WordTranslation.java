package ru.inwords.inwords.data.dto;

import androidx.annotation.NonNull;
import androidx.room.ColumnInfo;
import androidx.room.Entity;
import androidx.room.Ignore;
import androidx.room.Index;

import java.util.Objects;

@Entity(tableName = "word_translation_table",
        indices = {
                @Index(value = {"word_foreign", "word_native"}, unique = true)
        })
public class WordTranslation extends EntityIdentificator {
    private static final int LOCAL_REMOVE_FLAG = Integer.MIN_VALUE;

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
    public WordTranslation(EntityIdentificator entityIdentificator, @NonNull String wordForeign, @NonNull String wordNative) {
        super(entityIdentificator);
        this.wordForeign = wordForeign;
        this.wordNative = wordNative;
    }

    public WordTranslation(long id, int serverId, @NonNull String wordForeign, @NonNull String wordNative) {
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
        serverId = LOCAL_REMOVE_FLAG;
    }

    public boolean isLocallyDeleted() {
        return serverId == LOCAL_REMOVE_FLAG;
    }

    public EntityIdentificator getWordIdentificator() {
        return this; //TODO
    }

    @NonNull
    public String getWordForeign() {
        return wordForeign;
    }

    @NonNull
    public String getWordNative() {
        return wordNative;
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

    @Override
    public WordTranslation clone() {
        final WordTranslation clone = (WordTranslation) super.clone();

        clone.wordForeign = this.wordForeign;
        clone.wordNative = this.wordNative;

        return clone;
    }
}
