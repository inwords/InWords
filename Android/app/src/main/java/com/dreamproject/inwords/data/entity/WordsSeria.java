package com.dreamproject.inwords.data.entity;

import android.arch.persistence.room.ColumnInfo;
import android.arch.persistence.room.Entity;
import android.arch.persistence.room.Index;
import android.support.annotation.NonNull;

@Entity(tableName = "word_seria_table",
        indices = {
                @Index(value = "server_id", unique = true)
        })
public class WordsSeria extends EntityIdentificator {
    @NonNull
    @ColumnInfo(name = "creators_nick")
    String creatorNick;

    /*@NonNull
    @ColumnInfo(name = "word_seria_descriptions")
    List<WordSeriaDescription> wordSeriaDescriptions;

    public WordsSeria(int id, int serverId, @NonNull String creatorNick, @NonNull List<WordSeriaDescription> wordSeriaDescriptions) {
        super(id, serverId);
        this.creatorNick = creatorNick;
        this.wordSeriaDescriptions = wordSeriaDescriptions;
    }*/


}
