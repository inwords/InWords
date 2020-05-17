package ru.inwords.inwords.profile.data.source;

import androidx.room.Dao;
import androidx.room.Insert;
import androidx.room.OnConflictStrategy;
import androidx.room.Query;
import androidx.room.Transaction;

import io.reactivex.Single;
import ru.inwords.inwords.profile.data.entity.ProfileEntity;


@Dao
public abstract class UserDao {
    @Query("SELECT * FROM user_table LIMIT 1")
    public abstract Single<ProfileEntity> getAuthorisedUser();

    @Transaction
    public long insert(ProfileEntity user) {
        deleteAll();
        return insertInternal(user);
    }

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    abstract long insertInternal(ProfileEntity user);

    @Query("DELETE FROM user_table")
    abstract void deleteAll();
}
