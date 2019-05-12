package ru.inwords.inwords.presentation.viewScenario.main_activity

import android.os.Bundle
import androidx.lifecycle.ViewModelProviders
import androidx.navigation.NavController
import androidx.navigation.Navigation
import androidx.navigation.ui.NavigationUI
import dagger.android.support.DaggerAppCompatActivity
import kotlinx.android.synthetic.main.activity_main.*
import ru.inwords.inwords.R
import javax.inject.Inject

class MainActivity : DaggerAppCompatActivity() {
    @Inject
    internal lateinit var modelFactory: IntegrationViewModelFactory
    private lateinit var viewModel: IntegrationViewModel

    private lateinit var navController: NavController

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        viewModel = getViewModel()

        navController = Navigation.findNavController(this, R.id.main_nav_host_fragment)

        setupBottomNavMenu(navController)
    }

    private fun setupBottomNavMenu(navController: NavController) {
        NavigationUI.setupWithNavController(navigation, navController)
    }

    override fun onSupportNavigateUp(): Boolean {
        return navController.navigateUp()
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

    private fun getViewModel(): IntegrationViewModel {
        return ViewModelProviders.of(this, modelFactory).get(IntegrationViewModel::class.java)
    }
}
