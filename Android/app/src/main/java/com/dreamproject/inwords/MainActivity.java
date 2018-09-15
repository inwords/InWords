package com.dreamproject.inwords;

import android.net.Uri;
import android.os.Bundle;
import android.support.design.widget.BottomNavigationView;
import android.support.v7.app.AppCompatActivity;

import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.ui.NavigationUI;

public class MainActivity extends AppCompatActivity implements
        MainFragment.OnFragmentInteractionListener,
        LoginFragment.OnFragmentInteractionListener,
        TranslationMainFragment.OnFragmentInteractionListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        setupBottomNavMenu(Navigation.findNavController(this, R.id.main_nav_host_fragment));
    }

    private void setupBottomNavMenu(NavController navController) {
        NavigationUI.setupWithNavController((BottomNavigationView) findViewById(R.id.navigation), navController);
    }

    @Override
    public boolean onSupportNavigateUp() {
        return Navigation.findNavController(this, R.id.main_nav_host_fragment).navigateUp();
    }

    @Override
    public void onFragmentInteraction(Uri uri) {

    }
}
