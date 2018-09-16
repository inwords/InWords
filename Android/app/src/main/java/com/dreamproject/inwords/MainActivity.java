package com.dreamproject.inwords;

import android.os.Bundle;
import android.support.design.widget.BottomNavigationView;
import android.support.v7.app.AppCompatActivity;
import android.widget.TextView;

import com.jakewharton.rxbinding2.support.design.widget.RxBottomNavigationView;

public class MainActivity extends AppCompatActivity implements MainView {

    private MainPresenter presenter;
    private TextView mTextMessage;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        presenter = new MainPresenterImpl(getApplication(), this);
        mTextMessage = findViewById(R.id.message);

        BottomNavigationView navigation = findViewById(R.id.navigation);
        presenter.navigationItemSelectionHandler(RxBottomNavigationView.itemSelections(navigation));
    }

    @Override
    public void showText(String text) {
        mTextMessage.setText(text);
    }

    @Override
    public void showTextHome() {
        mTextMessage.setText(R.string.title_home);
    }

    @Override
    public void showTextDashboard() {
        mTextMessage.setText(R.string.title_dashboard);
    }

    @Override
    public void showTextNotifications() {
        mTextMessage.setText(R.string.title_notifications);
    }

    @Override
    public void appendText(String text) {
        mTextMessage.append(text);
    }
}
