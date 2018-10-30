package com.dreamproject.inwords.data.source.database;

import android.arch.persistence.room.Database;
import android.arch.persistence.room.RoomDatabase;

import com.dreamproject.inwords.data.entity.User;
import com.dreamproject.inwords.data.entity.WordTranslation;

@Database(entities = {WordTranslation.class, User.class}, version = 1)
public abstract class AppRoomDatabase extends RoomDatabase {

    public abstract WordTranslationDao wordTranslationDao();
    public abstract UserDao userDao();
}