package com.dreamproject.inwords;

import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.v7.app.AppCompatActivity;
import android.view.MenuItem;
import android.widget.TextView;

import com.dreamproject.inwords.data.entity.User;
import com.dreamproject.inwords.data.source.WebService.WebRequests;

import io.reactivex.Observable;
import io.reactivex.android.schedulers.AndroidSchedulers;

public class MainActivity extends AppCompatActivity {

    private TextView mTextMessage;

    private BottomNavigationView.OnNavigationItemSelectedListener mOnNavigationItemSelectedListener
            = new BottomNavigationView.OnNavigationItemSelectedListener() {

        @Override
        public boolean onNavigationItemSelected(@NonNull MenuItem item) {
            switch (item.getItemId()) {
                case R.id.navigation_home:
                    mTextMessage.setText(R.string.title_home);

                    User user = new User(0, "Vasilii", "Shumilov", null, "12345", "eeeerock");

                    WebRequests webRequests = WebRequests.INSTANCE;

                    webRequests.addUser(user).subscribe(System.out::println, Throwable::printStackTrace);
                    webRequests.getUsers()
                            .flatMap(Observable::fromIterable)
                            .observeOn(AndroidSchedulers.mainThread())
                            .subscribe(userr -> mTextMessage.append(userr.getUserName() + "\n")
                                    ,
                                    e -> mTextMessage.setText(e.getMessage()));

                    return true;
                case R.id.navigation_dashboard:
                    mTextMessage.setText(R.string.title_dashboard);
                    return true;
                case R.id.navigation_notifications:
                    mTextMessage.setText(R.string.title_notifications);
                    return true;
            }
            return false;
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mTextMessage = findViewById(R.id.message);
        BottomNavigationView navigation = findViewById(R.id.navigation);
        navigation.setOnNavigationItemSelectedListener(mOnNavigationItemSelectedListener);
    }

}
