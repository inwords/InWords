package ru.inwords.inwords.presentation.viewScenario.main_activity

import android.os.Bundle
import android.util.Log
import androidx.lifecycle.ViewModelProviders
import androidx.navigation.NavController
import androidx.navigation.Navigation
import androidx.navigation.ui.NavigationUI
import com.google.android.gms.common.ConnectionResult
import com.google.android.gms.common.GoogleApiAvailability
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

        checkPlayServices()

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

    private fun checkPlayServices(): Boolean {
        val apiAvailability = GoogleApiAvailability.getInstance()
        val resultCode = apiAvailability.isGooglePlayServicesAvailable(this)
        if (resultCode != ConnectionResult.SUCCESS) {
            if (apiAvailability.isUserResolvableError(resultCode)) {
                apiAvailability.getErrorDialog(this, resultCode, PLAY_SERVICES_RESOLUTION_REQUEST)
                        .show()
            } else {
                Log.i(TAG, "This device is not supported.")
                finish()
            }
            return false
        }
        return true
    }

    private fun getViewModel(): IntegrationViewModel {
        return ViewModelProviders.of(this, modelFactory).get(IntegrationViewModel::class.java)
    }

    companion object {
        const val TAG = "MainActivity"
        const val PLAY_SERVICES_RESOLUTION_REQUEST = 9000
    }
}
