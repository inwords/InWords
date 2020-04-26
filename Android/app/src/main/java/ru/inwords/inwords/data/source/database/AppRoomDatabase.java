package ru.inwords.inwords.data.source.database;

import androidx.room.Database;
import androidx.room.RoomDatabase;
import androidx.room.TypeConverters;

import ru.inwords.inwords.game.data.bean.GameInfoEntity;
import ru.inwords.inwords.game.data.bean.GameLevel;
import ru.inwords.inwords.game.data.bean.GameResponse;
import ru.inwords.inwords.game.data.bean.LevelScoreRequest;
import ru.inwords.inwords.game.data.source.GameDao;
import ru.inwords.inwords.game.data.source.GameInfoDao;
import ru.inwords.inwords.game.data.source.GameLevelDao;
import ru.inwords.inwords.game.data.source.LevelScoreRequestDao;
import ru.inwords.inwords.profile.data.bean.User;
import ru.inwords.inwords.profile.data.source.UserDao;
import ru.inwords.inwords.translation.data.deferred.WordTranslationDeferredEntry;
import ru.inwords.inwords.translation.data.deferred.WordTranslationEntriesListDao;

@TypeConverters(value = {
        RoomTypeConverter.class,
        RoomDeferredEntryManagerStatusConverter.class
})
@Database(entities = {
        User.class,
        GameResponse.class,
        GameLevel.class,
        GameInfoEntity.class,
        LevelScoreRequest.class,
        WordTranslationDeferredEntry.class
}, version = 6)
public abstract class AppRoomDatabase extends RoomDatabase {

    public abstract UserDao userDao();

    public abstract GameDao gameDao();

    public abstract GameLevelDao gameLevelDao();

    public abstract GameInfoDao gameInfoDao();

    public abstract LevelScoreRequestDao levelScoreRequestDao();

    public abstract WordTranslationEntriesListDao localWordTranslationEntriesListDao();

}