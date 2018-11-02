package com.dreamproject.inwords.data.entity;

import android.arch.persistence.room.ColumnInfo;
import android.arch.persistence.room.Ignore;
import android.arch.persistence.room.PrimaryKey;

import java.io.Serializable;
import java.util.Objects;

public class EntityIdentificator implements Cloneable, Serializable {
    @PrimaryKey(autoGenerate = true)
    @ColumnInfo(name = "id")
    protected int id;

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

    public EntityIdentificator(int id, int serverId) {
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
