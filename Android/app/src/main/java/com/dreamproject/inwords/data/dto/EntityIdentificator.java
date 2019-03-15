package com.dreamproject.inwords.data.dto;

import java.io.Serializable;
import java.util.Objects;

import androidx.annotation.NonNull;
import androidx.room.ColumnInfo;
import androidx.room.Ignore;
import androidx.room.PrimaryKey;

public class EntityIdentificator implements Cloneable, Serializable {
    @PrimaryKey(autoGenerate = true)
    @ColumnInfo(name = "id")
    protected long id;

    @ColumnInfo(name = "server_id")
    protected int serverId;

    @Ignore
    public EntityIdentificator() {
        this.id = 0;
        this.serverId = 0;
    }

    public EntityIdentificator(EntityIdentificator entityIdentificator) {
        this.id = entityIdentificator.id;
        this.serverId = entityIdentificator.serverId;
    }

    public EntityIdentificator(long id, int serverId) {
        this.id = id;
        this.serverId = serverId;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getServerId() {
        return serverId;
    }

    public void setServerId(int serverId) {
        this.serverId = serverId;
    }

    @NonNull
    @Override
    public String toString() {
        return "EntityIdentificator{" +
                "id=" + id +
                ", serverId=" + serverId +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        EntityIdentificator that = (EntityIdentificator) o;
        return id == that.id &&
                serverId == that.serverId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, serverId);
    }

    @Override
    public Object clone() {
        final WordTranslation clone;
        try {
            clone = (WordTranslation) super.clone();
        } catch (CloneNotSupportedException e) {
            throw new RuntimeException("Superclass messed up", e);
        }
        clone.id = this.id;
        clone.serverId = this.serverId;

        return clone;
    }
}
