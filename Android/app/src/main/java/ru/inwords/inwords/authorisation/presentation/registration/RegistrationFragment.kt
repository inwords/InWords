package ru.inwords.inwords.authorisation.presentation.registration

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.view.isVisible
import androidx.navigation.fragment.navArgs
import ru.inwords.inwords.R
import ru.inwords.inwords.authorisation.presentation.AuthorisationViewModelFactory
import ru.inwords.inwords.authorisation.presentation.AuthorisationViewState
import ru.inwords.inwords.core.AfterTextChangedWatcher
import ru.inwords.inwords.core.Event
import ru.inwords.inwords.core.utils.KeyboardUtils
import ru.inwords.inwords.core.utils.observe
import ru.inwords.inwords.core.validation.ValidationResult
import ru.inwords.inwords.databinding.FragmentSignUpBinding
import ru.inwords.inwords.presentation.view_scenario.FragmentWithViewModelAndNav
import ru.inwords.inwords.profile.data.bean.UserCredentials

class RegistrationFragment : FragmentWithViewModelAndNav<RegistrationViewModel, AuthorisationViewModelFactory, FragmentSignUpBinding>() {
    override val layout = R.layout.fragment_sign_up
    override val classType = RegistrationViewModel::class.java

    private val args by navArgs<RegistrationFragmentArgs>()

    override fun bindingInflate(inflater: LayoutInflater, container: ViewGroup?, attachToRoot: Boolean): FragmentSignUpBinding {
        return FragmentSignUpBinding.inflate(inflater, container, attachToRoot)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setupWithNavController(binding.toolbar)

        setupValidation()

        binding.signUpButton.setOnClickListener {
            viewModel.onSignClicked(
                UserCredentials(
                    email = binding.emailEditText.text?.toString().orEmpty(),
                    password = binding.passwordEditText.text?.toString().orEmpty()
                ),
                binding.confirmPasswordEditText.text?.toString().orEmpty()
            )
        }
        binding.signInTextView.setOnClickListener { viewModel.onNavigateToLoginClicked(args.onTopOfLogin) } //TODO clicks

        observe(viewModel.authorisationState) {
            processViewState(it)
        }

        binding.emailEditText.addTextChangedListener(AfterTextChangedWatcher { binding.emailLayout.error = null })
        binding.passwordEditText.addTextChangedListener(AfterTextChangedWatcher { binding.passwordLayout.error = null })
    }

    private fun setupValidation() {
        binding.emailEditText.addTextChangedListener(AfterTextChangedWatcher { binding.emailLayout.error = null })
        binding.passwordEditText.addTextChangedListener(AfterTextChangedWatcher { binding.passwordLayout.error = null })
        binding.confirmPasswordEditText.addTextChangedListener(AfterTextChangedWatcher { binding.confirmPasswordLayout.error = null })

        observe(viewModel.validationLiveData) {
            if (it.emailState is ValidationResult.Error) {
                binding.emailLayout.error = it.emailState.message
                renderDefaultState()
            }
            if (it.passwordState is ValidationResult.Error) {
                binding.passwordLayout.error = it.passwordState.message
                renderDefaultState()
            }
            if (it.passwordConfirmationState is ValidationResult.Error) {
                binding.confirmPasswordLayout.error = it.passwordConfirmationState.message
                renderDefaultState()
            }
        }
    }

    private fun renderDefaultState() {
        binding.signUpButton.isEnabled = true
        binding.errorTextView.isVisible = false
        hideProgress()
    }

    private fun renderLoadingState() {
        binding.signUpButton.isEnabled = false
        binding.errorTextView.isVisible = false
        showProgress()
    }

    private fun renderSuccessState() {
        binding.signUpButton.isEnabled = false
        //TODO какую-ниюудь галочку или что-то
        binding.errorTextView.isVisible = false
        hideProgress()
    }

    private fun renderErrorState(throwable: Throwable) {
        binding.signUpButton.isEnabled = true
        binding.errorTextView.text = "Попробуйте ещё раз\nОшибка: ${throwable.localizedMessage}"
        binding.errorTextView.isVisible = true
        hideProgress()
    }

    private fun processViewState(viewStateEvent: Event<AuthorisationViewState>) {
        binding.emailEditText.error = null
        binding.passwordEditText.error = null

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
        binding.progressView.isVisible = true
        binding.progressView.progress = 50
    }

    private fun hideProgress() {
        binding.progressView.isVisible = false
        binding.progressView.progress = 0
    }

    private fun navigateOnSuccess() {
        KeyboardUtils.hideKeyboard(view)
        viewModel.popOutOfAuth()
    }
}
