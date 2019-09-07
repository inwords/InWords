package ru.inwords.inwords.presentation.viewScenario.main_activity

import android.os.Bundle
import android.util.Log
import android.view.View
import androidx.lifecycle.ViewModelProviders
import androidx.navigation.NavController
import androidx.navigation.Navigation
import androidx.navigation.ui.NavigationUI
import com.google.android.gms.common.ConnectionResult
import com.google.android.gms.common.GoogleApiAvailability
import dagger.android.support.DaggerAppCompatActivity
import io.reactivex.disposables.Disposable
import kotlinx.android.synthetic.main.activity_main.*
import ru.inwords.inwords.R
import ru.inwords.inwords.core.KeyboardManager
import ru.inwords.inwords.core.KeyboardStatus
import javax.inject.Inject

class MainActivity : DaggerAppCompatActivity() {
    @Inject
    internal lateinit var modelFactory: IntegrationViewModelFactory
    private lateinit var viewModel: IntegrationViewModel

    private lateinit var navController: NavController

    private var keyboardStatusDisposable: Disposable? = null
    private var stoppedKeyboardListener = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        checkPlayServices()

        viewModel = getViewModel()

        navController = Navigation.findNavController(this, R.id.main_nav_host_fragment)

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
                R.id.policyFragment -> hideNavigation()

                else -> showNavigation()
            }
        }
    }

    override fun onDestroy() {
        keyboardStatusDisposable?.dispose()
        super.onDestroy()
    }

    private fun showNavigation(keyboardReferer: Boolean = false) {
        navigation.visibility = View.VISIBLE

        if (!keyboardReferer) {
            stoppedKeyboardListener = false
        }
    }

    private fun hideNavigation(keyboardReferer: Boolean = false) {
        navigation.visibility = View.GONE

        if (!keyboardReferer) {
            stoppedKeyboardListener = true
        }
    }

    private fun setupBottomNavMenu(navController: NavController) {
        NavigationUI.setupWithNavController(navigation, navController)
        navigation.setOnNavigationItemReselectedListener {
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

    private fun getViewModel(): IntegrationViewModel {
        return ViewModelProviders.of(this, modelFactory).get(IntegrationViewModel::class.java)
    }

    companion object {
        const val TAG = "MainActivity"
        const val PLAY_SERVICES_RESOLUTION_REQUEST = 9000
    }
}
