package ru.inwords.inwords.presentation.viewScenario.authorisation.login

import android.os.Bundle
import android.view.View
import com.jakewharton.rxbinding2.view.RxView
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
        viewModel.onNavigateHandler(RxView.clicks(textViewSignUp))
    }

    override fun navigateAction() {
        navigateToRegistration()
    }

    override fun navigateOnSuccess() {
        navController.navigate(R.id.action_loginFragment_to_mainFragment_pop)
    }

    private fun navigateToRegistration() {
        navController.navigate(R.id.action_loginFragment_to_registrationFragment)
    }
}
