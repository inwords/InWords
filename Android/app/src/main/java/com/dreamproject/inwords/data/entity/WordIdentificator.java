package com.dreamproject.inwords.data.entity;

import android.arch.persistence.room.ColumnInfo;
import android.arch.persistence.room.Ignore;
import android.arch.persistence.room.PrimaryKey;

import java.util.Objects;

public class WordIdentificator {
    @PrimaryKey(autoGenerate = true)
    @ColumnInfo(name = "id")
    protected int id;

    @ColumnInfo(name = "server_id")
    protected int serverId;

    @Ignore
    public WordIdentificator() {
        this.id = 0;
        this.serverId = 0;
    }

    public WordIdentificator(WordIdentificator wordIdentificator) {
        this.id = wordIdentificator.id;
        this.serverId = wordIdentificator.serverId;
    }

    public WordIdentificator(int id, int serverId) {
        this.id = id;
        this.serverId = serverId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getServerId() {
        return serverId;
    }

    public void setServerId(int serverId) {
        this.serverId = serverId;
    }

    @Override
    public String toString() {
        return "WordIdentificator{" +
                "id=" + id +
                ", serverId=" + serverId +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        WordIdentificator that = (WordIdentificator) o;
        return id == that.id &&
                serverId == that.serverId;
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, serverId);
    }
}
