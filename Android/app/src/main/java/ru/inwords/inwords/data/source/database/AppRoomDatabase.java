package ru.inwords.inwords.data.source.database;

import androidx.room.Database;
import androidx.room.RoomDatabase;
import androidx.room.TypeConverters;

import ru.inwords.inwords.game.data.entity.GameEntity;
import ru.inwords.inwords.game.data.entity.GameInfoEntity;
import ru.inwords.inwords.game.data.entity.GameLevelEntity;
import ru.inwords.inwords.game.data.entity.LevelMetricEntity;
import ru.inwords.inwords.game.data.source.GameDao;
import ru.inwords.inwords.game.data.source.GameInfoDao;
import ru.inwords.inwords.game.data.source.GameLevelDao;
import ru.inwords.inwords.game.data.source.LevelScoreRequestDao;
import ru.inwords.inwords.profile.data.entity.ProfileEntity;
import ru.inwords.inwords.profile.data.source.UserDao;
import ru.inwords.inwords.translation.data.deferred.WordTranslationDeferredEntry;
import ru.inwords.inwords.translation.data.deferred.WordTranslationEntriesListDao;

@TypeConverters(value = {
        RoomTypeConverter.class,
        RoomDeferredEntryManagerStatusConverter.class
})
@Database(entities = {
        ProfileEntity.class,
        GameEntity.class,
        GameLevelEntity.class,
        GameInfoEntity.class,
        LevelMetricEntity.class,
        WordTranslationDeferredEntry.class
}, version = 8)
public abstract class AppRoomDatabase extends RoomDatabase {

    public abstract UserDao userDao();

    public abstract GameDao gameDao();

    public abstract GameLevelDao gameLevelDao();

    public abstract GameInfoDao gameInfoDao();

    public abstract LevelScoreRequestDao levelScoreRequestDao();

    public abstract WordTranslationEntriesListDao localWordTranslationEntriesListDao();

}