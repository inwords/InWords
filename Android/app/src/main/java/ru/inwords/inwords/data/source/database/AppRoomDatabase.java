package ru.inwords.inwords.data.source.database;

import androidx.room.Database;
import androidx.room.RoomDatabase;
import androidx.room.TypeConverters;

import ru.inwords.inwords.data.dto.User;
import ru.inwords.inwords.data.dto.WordTranslation;
import ru.inwords.inwords.data.dto.game.Game;
import ru.inwords.inwords.data.dto.game.GameInfo;
import ru.inwords.inwords.data.dto.game.GameLevel;
import ru.inwords.inwords.data.dto.game.LevelScoreRequest;
import ru.inwords.inwords.data.source.database.game.GameDao;
import ru.inwords.inwords.data.source.database.game.GameInfoDao;
import ru.inwords.inwords.data.source.database.game.GameLevelDao;
import ru.inwords.inwords.data.source.database.game.LevelScoreRequestDao;

@TypeConverters(RoomTypeConverter.class)
@Database(entities = {WordTranslation.class, User.class,
        Game.class, GameLevel.class, GameInfo.class, LevelScoreRequest.class}, version = 1)
public abstract class AppRoomDatabase extends RoomDatabase {

    public abstract WordTranslationDao wordTranslationDao();

    public abstract UserDao userDao();

    public abstract GameDao gameDao();

    public abstract GameLevelDao gameLevelDao();

    public abstract GameInfoDao gameInfoDao();

    public abstract LevelScoreRequestDao levelScoreRequestDao();
}