package ru.inwords.inwords.main_activity.presentation

import android.os.Bundle
import android.util.Log
import android.view.View
import androidx.activity.viewModels
import androidx.navigation.NavController
import androidx.navigation.Navigation
import androidx.navigation.ui.NavigationUI
import com.google.android.gms.common.ConnectionResult
import com.google.android.gms.common.GoogleApiAvailability
import dagger.android.support.DaggerAppCompatActivity
import io.reactivex.disposables.Disposable
import ru.inwords.inwords.R
import ru.inwords.inwords.core.managers.KeyboardManager
import ru.inwords.inwords.core.managers.KeyboardStatus
import ru.inwords.inwords.databinding.ActivityMainBinding
import javax.inject.Inject

class MainActivity : DaggerAppCompatActivity() {
    @Inject
    internal lateinit var modelFactory: IntegrationViewModelFactory
    private val viewModel: IntegrationViewModel by viewModels { modelFactory }

    private lateinit var navController: NavController

    private lateinit var binding: ActivityMainBinding

    private var keyboardStatusDisposable: Disposable? = null
    private var stoppedKeyboardListener = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        checkPlayServices()

        navController = Navigation.findNavController(this, R.id.main_nav_host_fragment)

        viewModel.toString()

        setupBottomNavMenu(navController)

        keyboardStatusDisposable = KeyboardManager(this).status()
            .subscribe {
                if (!stoppedKeyboardListener) {
                    @Suppress("WHEN_ENUM_CAN_BE_NULL_IN_JAVA")
                    when (it) {
                        KeyboardStatus.OPEN -> hideNavigation(true)
                        KeyboardStatus.CLOSED -> showNavigation(true)
                    }
                }
            }

        navController.addOnDestinationChangedListener { _, destination, _ ->
            when (destination.id) {
                R.id.policyFragment,
                R.id.profileFragment,
                R.id.registrationFragment,
                R.id.loginFragment,
                R.id.gameLevelFragment,
                R.id.gameEndBottomSheet,
                R.id.addEditWordFragment -> hideNavigation()
//                R.id.customGameCreatorFragment -> hideNavigation()

                else -> showNavigation()
            }
        }
    }

    override fun onDestroy() {
        keyboardStatusDisposable?.dispose()

        super.onDestroy()
    }

    private fun showNavigation(keyboardReferer: Boolean = false) {
        binding.navigation.visibility = View.VISIBLE

        if (!keyboardReferer) {
            stoppedKeyboardListener = false
        }
    }

    private fun hideNavigation(keyboardReferer: Boolean = false) {
        binding.navigation.visibility = View.GONE

        if (!keyboardReferer) {
            stoppedKeyboardListener = true
        }
    }

    private fun setupBottomNavMenu(navController: NavController) {
        NavigationUI.setupWithNavController(binding.navigation, navController)
        binding.navigation.setOnNavigationItemReselectedListener {
            //чтобы нельзя было выбрать текущий фрагмент еще раз
        }
    }

    override fun onSupportNavigateUp(): Boolean {
        return navController.navigateUp()
    }

    override fun onBackPressed() {
        if (navController.currentDestination?.id == R.id.policyFragment) {
            finish()
        } else {
            super.onBackPressed()
        }
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


    companion object {
        const val TAG = "MainActivity"
        const val PLAY_SERVICES_RESOLUTION_REQUEST = 9000
    }
}
