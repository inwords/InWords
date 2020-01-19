package ru.inwords.inwords.authorisation.presentation.login

import android.os.Bundle
import android.view.View
import androidx.core.view.isVisible
import androidx.navigation.ui.NavigationUI
import kotlinx.android.synthetic.main.fragment_sign_in.*
import ru.inwords.inwords.R
import ru.inwords.inwords.authorisation.presentation.AuthorisationViewModelFactory
import ru.inwords.inwords.authorisation.presentation.AuthorisationViewState
import ru.inwords.inwords.core.AfterTextChangedWatcher
import ru.inwords.inwords.core.Event
import ru.inwords.inwords.core.utils.KeyboardUtils
import ru.inwords.inwords.core.utils.observe
import ru.inwords.inwords.core.validation.ValidationResult
import ru.inwords.inwords.presentation.view_scenario.FragmentWithViewModelAndNav
import ru.inwords.inwords.profile.data.bean.UserCredentials

class LoginFragment : FragmentWithViewModelAndNav<LoginViewModel, AuthorisationViewModelFactory>() {
    override val layout = R.layout.fragment_sign_in
    override val classType = LoginViewModel::class.java

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        NavigationUI.setupWithNavController(toolbar, navController)

        setupValidation()

        buttonEnterSignIn.setOnClickListener {
            viewModel.onSignInClicked(
                UserCredentials(
                    email = email_edit_text.text?.toString().orEmpty(),
                    password = password_edit_text.text?.toString().orEmpty()
                )
            )
        }
        textViewSignUp.setOnClickListener { viewModel.onNavigateClicked() } //TODO clicks

        observe(viewModel.navigateTo) { event ->
            event.contentIfNotHandled?.also {
                navigateToRegistration()
            }
        }
        observe(viewModel.authorisationState) {
            processViewState(it)
        }
    }

    private fun setupValidation() {
        email_edit_text.addTextChangedListener(AfterTextChangedWatcher { email_layout.error = null })
        password_edit_text.addTextChangedListener(AfterTextChangedWatcher { password_layout.error = null })

        observe(viewModel.validationLiveData) {
            if (it.emailState is ValidationResult.Error) {
                email_layout.error = it.emailState.message
                renderDefaultState()
            }
            if (it.passwordState is ValidationResult.Error) {
                password_layout.error = it.passwordState.message
                renderDefaultState()
            }
        }
    }

    private fun renderDefaultState() {
        buttonEnterSignIn.isEnabled = true
        error_text_view.isVisible = false
        hideProgress()
    }

    private fun renderLoadingState() {
        buttonEnterSignIn.isEnabled = false
        error_text_view.isVisible = false
        showProgress()
    }

    private fun renderSuccessState() {
        buttonEnterSignIn.isEnabled = false
        //TODO какую-ниюудь галочку или что-то
        error_text_view.isVisible = false
        hideProgress()
    }

    private fun renderErrorState(throwable: Throwable) {
        buttonEnterSignIn.isEnabled = true
        error_text_view.text = "Попробуйте ещё раз\nОшибка: ${throwable.localizedMessage}"
        error_text_view.isVisible = true
        hideProgress()
    }

    private fun processViewState(viewStateEvent: Event<AuthorisationViewState>) {
        email_edit_text.error = null
        password_edit_text.error = null

        val authorisationViewState = viewStateEvent.peekContent()

        @Suppress("WHEN_ENUM_CAN_BE_NULL_IN_JAVA")
        when (authorisationViewState.status) {
            AuthorisationViewState.Status.LOADING -> {
                renderLoadingState()
            }

            AuthorisationViewState.Status.SUCCESS -> {
                renderSuccessState()
                if (viewStateEvent.handle()) {
                    navigateOnSuccess()
                }
            }

            AuthorisationViewState.Status.ERROR -> {
                viewStateEvent.peekContent().throwable?.also {
                    renderErrorState(it)
                }
            }
        }
    }

    private fun showProgress() {
        progress_view.isVisible = true
        progress_view.progress = 50
    }

    private fun hideProgress() {
        progress_view.isVisible = false
        progress_view.progress = 0
    }

    private fun navigateOnSuccess() {
        KeyboardUtils.hideKeyboard(view)
        navController.navigate(LoginFragmentDirections.actionPopOutOfAuth())
    }

    private fun navigateToRegistration() {
        navController.navigate(LoginFragmentDirections.actionLoginFragmentToRegistrationFragment())
    }
}
