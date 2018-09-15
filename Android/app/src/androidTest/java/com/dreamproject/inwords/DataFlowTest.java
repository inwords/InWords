package com.dreamproject.inwords;

import android.support.test.InstrumentationRegistry;

import com.dreamproject.inwords.data.entity.User;
import com.dreamproject.inwords.data.entity.Word;
import com.dreamproject.inwords.data.source.WebService.WebRequests;
import com.dreamproject.inwords.data.source.database.AppRoomDatabase;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import io.reactivex.Flowable;
import io.reactivex.Observable;
import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.schedulers.Schedulers;

import static org.junit.Assert.fail;

public class DataFlowTest {
    private AppRoomDatabase mDatabase;
    private WebRequests mWebRequests = WebRequests.INSTANCE;

    private static final Word WORD = new Word("HELlo");
    private static final User USER = new User(0, "rockk", "v", "", "s", "123");

    @Test
    public void getBothFromRemoteAndLocalSource() {
        mDatabase.userDao().insert(USER);


        mWebRequests
                .getUsers()
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe( users ->
                        {
                           mDatabase.userDao().deleteAll();

                            Observable.fromIterable(users).subscribe(user->mDatabase.userDao().insert(user));

                            mDatabase.userDao()
                                    .getUsers()
                                    .flatMap(Flowable::fromIterable)
                                    .subscribe(System.out::println);
                        },
                        Throwable::printStackTrace
                );
    }

    @Test
    public void insertAndGetWordById() {
        try {
            // Given that we have a user in the data source
            mDatabase.wordDao().insert(WORD);

            // When subscribing to the emissions of user
            mDatabase.wordDao()
                    .getAllWords()
                    .flatMapObservable(Observable::fromIterable)
                    .test()
                    // assertValue asserts that there was only one emission
                    .assertValue(word -> {
                        // The emitted word is the expected one
                        return word.getWord().equals(WORD.getWord());
                    });
        } catch (Exception e) {
            e.printStackTrace();
            fail("exception");
        }
    }

    @Test
    public void insertOneAndGetUsers() {
        try {
            mDatabase.userDao().insert(USER);

            // When subscribing to the emissions of user
            mDatabase.userDao()
                    .getUsers()
                    .flatMap(Flowable::fromIterable)
                    .test()
                    // assertValue asserts that there was only one emission
                    .assertValue(user -> {
                        // The emitted user is the expected one
                        return user.getUserId() == USER.getUserId();
                    });

        } catch (Exception e) {
            e.printStackTrace();
            fail("exception");
        }
    }


    @Before
    public void initDb() {
        mDatabase = AppRoomDatabase.getDatabase(InstrumentationRegistry.getTargetContext());
    }

    @After
    public void closeDb() {
        mDatabase.close();
    }
}
