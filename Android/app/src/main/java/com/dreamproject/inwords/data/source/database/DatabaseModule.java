package com.dreamproject.inwords.data.source.database;

import android.arch.persistence.room.Room;
import android.content.Context;

import javax.inject.Inject;

import dagger.Module;
import dagger.Provides;

@Module
public class DatabaseModule {

    @Provides
    @Inject
    AppRoomDatabase provideDatabase(Context context){
        return Room.inMemoryDatabaseBuilder(context.getApplicationContext(),
                AppRoomDatabase.class)//, "word_database")
                .build();
    }
}
