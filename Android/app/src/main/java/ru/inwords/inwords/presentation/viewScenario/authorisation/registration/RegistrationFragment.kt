package ru.inwords.inwords.presentation.viewScenario.authorisation.registration

import android.os.Bundle
import android.view.View
import android.widget.TextView
import com.jakewharton.rxbinding2.view.RxView
import io.reactivex.Observable
import kotlinx.android.synthetic.main.fragment_sign_up.*
import ru.inwords.inwords.R
import ru.inwords.inwords.data.dto.UserCredentials
import ru.inwords.inwords.presentation.viewScenario.authorisation.AuthorisationViewModelFactory
import ru.inwords.inwords.presentation.viewScenario.authorisation.SigningBaseFragment

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

        val textViewSignIn = view.findViewById<TextView>(R.id.textViewSignIn)

        viewModel.onNavigateHandler(RxView.clicks(textViewSignIn))
        buttonTrySign.setOnClickListener { viewModel.onSignClicked(credentials) }
    }

    override fun navigateAction() {
        navigateToLogin()
    }

    override fun navigateOnSuccess() {
        navController.navigate(R.id.action_registrationFragment_to_mainFragment_pop)
    }

    private fun navigateToLogin() {
        navController.navigate(R.id.action_registrationFragment_to_loginFragment_pop)
    }
}
