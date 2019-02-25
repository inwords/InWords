package com.dreamproject.inwords.data.source.database;

import com.dreamproject.inwords.data.dto.User;
import com.dreamproject.inwords.data.dto.WordTranslation;
import com.dreamproject.inwords.data.dto.game.Game;
import com.dreamproject.inwords.data.dto.game.GameLevel;
import com.dreamproject.inwords.data.dto.game.GameLevelInfo;
import com.dreamproject.inwords.data.source.database.game.GameDao;
import com.dreamproject.inwords.data.source.database.game.GameLevelDao;
import com.dreamproject.inwords.data.source.database.game.GameLevelInfoDao;

import androidx.room.Database;
import androidx.room.RoomDatabase;
import androidx.room.TypeConverters;

@TypeConverters(RoomTypeConverter.class)
@Database(entities = {WordTranslation.class, User.class,
        Game.class, GameLevel.class, GameLevelInfo.class}, version = 1)
public abstract class AppRoomDatabase extends RoomDatabase {

    public abstract WordTranslationDao wordTranslationDao();

    public abstract UserDao userDao();

    public abstract GameDao gameDao();

    public abstract GameLevelDao gameLevelDao();
    
    public abstract GameLevelInfoDao gameLevelInfoDaoDao();
}