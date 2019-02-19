package com.dreamproject.inwords;

import com.dreamproject.inwords.data.dto.User;
import com.dreamproject.inwords.data.dto.WordTranslation;
import com.dreamproject.inwords.data.source.database.AppRoomDatabase;
import com.dreamproject.inwords.data.source.webService.WebRequestsManager;
import com.dreamproject.inwords.data.source.webService.WebRequestsManagerImpl;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import androidx.test.InstrumentationRegistry;
import io.reactivex.Flowable;
import io.reactivex.Observable;
import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.schedulers.Schedulers;

import static org.junit.Assert.fail;

public class DataFlowTest {
    private AppRoomDatabase mDatabase;
    private WebRequestsManager mWebRequestsManager = WebRequestsManagerImpl.INSTANCE;

    private static final WordTranslation WORD_TRANSLATION = new WordTranslation("HELlo", "ыва");
    private static final User USER = new User(0, "rockk", "v", "", "s", "123");

    @Test
    public void getBothFromRemoteAndLocalSource() {
        mDatabase.userDao().insert(USER);


        mWebRequestsManager
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
