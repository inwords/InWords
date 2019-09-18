package ru.inwords.inwords.presentation.viewScenario.authorisation.login

import android.os.Bundle
import android.view.View
import kotlinx.android.synthetic.main.fragment_sign_in.*
import ru.inwords.inwords.R
import ru.inwords.inwords.presentation.viewScenario.authorisation.AuthorisationViewModelFactory
import ru.inwords.inwords.presentation.viewScenario.authorisation.SigningBaseFragment

class LoginFragment : SigningBaseFragment<LoginViewModel, AuthorisationViewModelFactory>() {
    override val layout = R.layout.fragment_sign_in
    override val classType = LoginViewModel::class.java

    override val buttonId = R.id.buttonEnterSignIn

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        buttonTrySign.setOnClickListener { viewModel.onSignClicked(credentials) }
        textViewSignUp.setOnClickListener { viewModel.onNavigateClicked() } //TODO clicks
    }

    override fun navigateAction() {
        navigateToRegistration()
    }

    override fun navigateOnSuccess() {
        navController.navigate(LoginFragmentDirections.actionLoginFragmentToMainFragmentPop())
    }

    private fun navigateToRegistration() {
        navController.navigate(LoginFragmentDirections.actionLoginFragmentToRegistrationFragment())
    }
}
