package ru.inwords.inwords.presentation.view_scenario.authorisation.registration

import android.os.Bundle
import android.view.View
import androidx.navigation.ui.NavigationUI
import io.reactivex.Observable
import kotlinx.android.synthetic.main.fragment_sign_up.*
import ru.inwords.inwords.R
import ru.inwords.inwords.core.utils.KeyboardUtils
import ru.inwords.inwords.presentation.view_scenario.authorisation.AuthorisationViewModelFactory
import ru.inwords.inwords.presentation.view_scenario.authorisation.SigningBaseFragment
import ru.inwords.inwords.profile.data.bean.UserCredentials

class RegistrationFragment : SigningBaseFragment<RegistrationViewModel, AuthorisationViewModelFactory>() {
    override val layout = R.layout.fragment_sign_up
    override val classType = RegistrationViewModel::class.java

    override val credentials: Observable<UserCredentials> //TODO show info
        get() = super.credentials.filter { (_, password) ->
            password == editTextConfirmPassword.text?.toString().orEmpty()
        }

    override val buttonId get() = R.id.buttonEnterSignUp

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        NavigationUI.setupWithNavController(toolbar, navController)

        textViewSignIn.setOnClickListener { viewModel.onNavigateClicked() } //TODO clicks
        buttonTrySign.setOnClickListener { viewModel.onSignClicked(credentials) }
    }

    override fun navigateAction() {
        navigateToLogin()
    }

    override fun navigateOnSuccess() {
        KeyboardUtils.hideKeyboard(view)
        navController.navigate(RegistrationFragmentDirections.actionPopOutOfAuth())
    }

    private fun navigateToLogin() {
        navController.navigate(RegistrationFragmentDirections.actionRegistrationFragmentToLoginFragmentPop())
    }
}
