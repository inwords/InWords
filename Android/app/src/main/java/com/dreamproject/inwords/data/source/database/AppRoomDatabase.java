package com.dreamproject.inwords.data.source.database;

import android.arch.persistence.room.Database;
import android.arch.persistence.room.Room;
import android.arch.persistence.room.RoomDatabase;
import android.content.Context;

import com.dreamproject.inwords.data.entity.User;
import com.dreamproject.inwords.data.entity.UserDao;
import com.dreamproject.inwords.data.entity.Word;
import com.dreamproject.inwords.data.entity.WordDao;

@Database(entities = {Word.class, User.class}, version = 1)
public abstract class AppRoomDatabase extends RoomDatabase {

    public abstract WordDao wordDao();
    public abstract UserDao userDao();

    private static AppRoomDatabase INSTANCE;

    public static AppRoomDatabase getDatabase(final Context context) {
        if (INSTANCE == null) {
            synchronized (AppRoomDatabase.class) {
                if (INSTANCE == null) {
                    INSTANCE = Room.inMemoryDatabaseBuilder(context.getApplicationContext(),
                            AppRoomDatabase.class)//, "word_database")
                            .build();
                }
            }
        }
        return INSTANCE;
    }
}