package com.dreamproject.inwords.data.source.database;

import dagger.Subcomponent;

@Subcomponent(modules = DatabaseModule.class)
public interface DatabaseComponent {
    AppRoomDatabase getDatabase();
}
