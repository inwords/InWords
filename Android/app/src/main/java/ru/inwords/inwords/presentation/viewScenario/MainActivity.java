package ru.inwords.inwords.presentation.viewScenario;

import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.ui.NavigationUI;

import com.google.android.material.bottomnavigation.BottomNavigationView;

import ru.inwords.inwords.R;

public class MainActivity extends AppCompatActivity {

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
