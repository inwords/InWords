package com.dreamproject.inwords.data.source.database;

import com.dreamproject.inwords.data.dto.User;
import com.dreamproject.inwords.data.dto.WordTranslation;
import com.dreamproject.inwords.data.dto.WordsSeria;

import androidx.room.Database;
import androidx.room.RoomDatabase;

@Database(entities = {WordTranslation.class, User.class, WordsSeria.class}, version = 1)
public abstract class AppRoomDatabase extends RoomDatabase {

    public abstract WordTranslationDao wordTranslationDao();
    public abstract UserDao userDao();
    public abstract WordsSeriaDao wordsSeriaDao();
}