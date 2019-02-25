package com.dreamproject.inwords.data.dto;

import androidx.room.ColumnInfo;
import androidx.room.Entity;
import androidx.room.Index;

@Entity(tableName = "word_seria_table",
        indices = {
                @Index(value = "server_id", unique = true)
        })
public class WordsSeria extends EntityIdentificator {
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
