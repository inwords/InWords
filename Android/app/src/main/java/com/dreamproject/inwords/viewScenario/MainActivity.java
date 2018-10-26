package com.dreamproject.inwords.viewScenario;

import android.net.Uri;
import android.os.Bundle;
import android.support.design.widget.BottomNavigationView;
import android.support.v7.app.AppCompatActivity;

import com.dreamproject.inwords.R;
import com.dreamproject.inwords.viewScenario.main.MainFragment;

import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.ui.NavigationUI;

public class MainActivity extends AppCompatActivity implements
        MainFragment.OnFragmentInteractionListener,
        PresenterNavFragment.OnFragmentInteractionListener {

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

    /*
    lateinit var image: Drawable

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_second)

        image = lastCustomNonConfigurationInstance as Drawable? ?: resources.getDrawable(R.drawable.mem, theme)
    }

    override fun onRetainCustomNonConfigurationInstance() = image
     */
}
