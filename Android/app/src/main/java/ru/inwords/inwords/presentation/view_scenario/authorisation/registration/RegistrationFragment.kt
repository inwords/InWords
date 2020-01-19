package ru.inwords.inwords.presentation.view_scenario.authorisation.registration

import android.os.Bundle
import android.view.View
import androidx.core.view.isVisible
import androidx.navigation.ui.NavigationUI
import kotlinx.android.synthetic.main.fragment_sign_up.*
import ru.inwords.inwords.R
import ru.inwords.inwords.core.AfterTextChangedWatcher
import ru.inwords.inwords.core.Event
import ru.inwords.inwords.core.utils.KeyboardUtils
import ru.inwords.inwords.core.utils.observe
import ru.inwords.inwords.core.validation.ValidationResult
import ru.inwords.inwords.presentation.view_scenario.FragmentWithViewModelAndNav
import ru.inwords.inwords.presentation.view_scenario.authorisation.AuthorisationViewModelFactory
import ru.inwords.inwords.presentation.view_scenario.authorisation.AuthorisationViewState
import ru.inwords.inwords.profile.data.bean.UserCredentials

class RegistrationFragment : FragmentWithViewModelAndNav<RegistrationViewModel, AuthorisationViewModelFactory>() {
    override val layout = R.layout.fragment_sign_up
    override val classType = RegistrationViewModel::class.java

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        NavigationUI.setupWithNavController(toolbar, navController)

        setupValidation()

        sign_up_button.setOnClickListener {
            viewModel.onSignClicked(
                UserCredentials(
                    email = email_edit_text.text?.toString().orEmpty(),
                    password = password_edit_text.text?.toString().orEmpty()
                ),
                confirm_password_edit_text.text?.toString().orEmpty()
            )
        }
        sign_in_text_view.setOnClickListener { viewModel.onNavigateClicked() } //TODO clicks

        observe(viewModel.navigateTo) { event ->
            event.contentIfNotHandled?.also {
                navigateToLogin()
            }
        }
        observe(viewModel.authorisationState) {
            processViewState(it)
        }

        email_edit_text.addTextChangedListener(AfterTextChangedWatcher { email_layout.error = null })
        password_edit_text.addTextChangedListener(AfterTextChangedWatcher { password_layout.error = null })
    }

    private fun setupValidation() {
        email_edit_text.addTextChangedListener(AfterTextChangedWatcher { email_layout.error = null })
        password_edit_text.addTextChangedListener(AfterTextChangedWatcher { password_layout.error = null })
        confirm_password_edit_text.addTextChangedListener(AfterTextChangedWatcher { confirm_password_layout.error = null })

        observe(viewModel.validationLiveData) {
            if (it.emailState is ValidationResult.Error) {
                email_layout.error = it.emailState.message
                renderDefaultState()
            }
            if (it.passwordState is ValidationResult.Error) {
                password_layout.error = it.passwordState.message
                renderDefaultState()
            }
            if (it.passwordConfirmationState is ValidationResult.Error) {
                confirm_password_layout.error = it.passwordConfirmationState.message
                renderDefaultState()
            }
        }
    }

    private fun renderDefaultState() {
        sign_up_button.isEnabled = true
        error_text_view.isVisible = false
        hideProgress()
    }

    private fun renderLoadingState() {
        sign_up_button.isEnabled = false
        error_text_view.isVisible = false
        showProgress()
    }

    private fun renderSuccessState() {
        sign_up_button.isEnabled = false
        //TODO какую-ниюудь галочку или что-то
        error_text_view.isVisible = false
        hideProgress()
    }

    private fun renderErrorState(throwable: Throwable) {
        sign_up_button.isEnabled = true
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
        navController.navigate(RegistrationFragmentDirections.actionPopOutOfAuth())
    }

    private fun navigateToLogin() {
        navController.navigate(RegistrationFragmentDirections.actionRegistrationFragmentToLoginFragmentPop())
    }
}
