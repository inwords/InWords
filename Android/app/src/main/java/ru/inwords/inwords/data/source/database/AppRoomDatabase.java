package ru.inwords.inwords.data.source.database;

import androidx.room.Database;
import androidx.room.RoomDatabase;
import androidx.room.TypeConverters;

import ru.inwords.inwords.game.data.bean.Game;
import ru.inwords.inwords.game.data.bean.GameInfo;
import ru.inwords.inwords.game.data.bean.GameLevel;
import ru.inwords.inwords.game.data.bean.LevelScoreRequest;
import ru.inwords.inwords.game.data.source.GameDao;
import ru.inwords.inwords.game.data.source.GameInfoDao;
import ru.inwords.inwords.game.data.source.GameLevelDao;
import ru.inwords.inwords.game.data.source.LevelScoreRequestDao;
import ru.inwords.inwords.profile.data.bean.User;
import ru.inwords.inwords.profile.data.source.UserDao;
import ru.inwords.inwords.translation.data.bean.WordTranslation;
import ru.inwords.inwords.translation.data.deferred.LocalWordTranslationEntriesListDao;
import ru.inwords.inwords.translation.data.deferred.WordTranslationDeferredEntry;
import ru.inwords.inwords.translation.data.source.WordTranslationDao;

@TypeConverters(value = {
        RoomTypeConverter.class,
        RoomDeferredEntryManagerStatusConverter.class
})
@Database(entities = {
        WordTranslation.class,
        User.class,
        Game.class,
        GameLevel.class,
        GameInfo.class,
        LevelScoreRequest.class,
        WordTranslationDeferredEntry.class
}, version = 3)
public abstract class AppRoomDatabase extends RoomDatabase {

    public abstract WordTranslationDao wordTranslationDao();

    public abstract UserDao userDao();

    public abstract GameDao gameDao();

    public abstract GameLevelDao gameLevelDao();

    public abstract GameInfoDao gameInfoDao();

    public abstract LevelScoreRequestDao levelScoreRequestDao();

    public abstract LocalWordTranslationEntriesListDao localWordTranslationEntriesListDao();

}