package ru.inwords.inwords.authorisation.presentation.registration

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.view.isVisible
import androidx.navigation.fragment.navArgs
import ru.inwords.inwords.R
import ru.inwords.inwords.authorisation.presentation.AuthorisationViewModelFactory
import ru.inwords.inwords.authorisation.presentation.AuthorisationViewState
import ru.inwords.inwords.authorisation.presentation.login.LoginFragment
import ru.inwords.inwords.authorisation.presentation.login.SignInWithGoogle
import ru.inwords.inwords.authorisation.presentation.login.showSignOutAndSignInDialog
import ru.inwords.inwords.core.AfterTextChangedWatcher
import ru.inwords.inwords.core.utils.KeyboardUtils
import ru.inwords.inwords.core.utils.observe
import ru.inwords.inwords.core.validation.ValidationResult
import ru.inwords.inwords.databinding.FragmentSignUpBinding
import ru.inwords.inwords.presentation.view_scenario.FragmentWithViewModelAndNav
import ru.inwords.inwords.profile.data.bean.UserCredentials
import javax.inject.Inject

class RegistrationFragment : FragmentWithViewModelAndNav<RegistrationViewModel, AuthorisationViewModelFactory, FragmentSignUpBinding>() {
    override val layout = R.layout.fragment_sign_up
    override val classType = RegistrationViewModel::class.java

    private val args by navArgs<RegistrationFragmentArgs>()

    @Inject
    internal lateinit var signInWithGoogle: SignInWithGoogle

    override fun bindingInflate(inflater: LayoutInflater, container: ViewGroup?, attachToRoot: Boolean): FragmentSignUpBinding {
        return FragmentSignUpBinding.inflate(inflater, container, attachToRoot)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setupWithNavController(binding.toolbar)

        setupValidation()

        binding.signInWithGoogleButton.setOnClickListener { signIn(signInWithGoogle) }

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

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        if (requestCode == LoginFragment.RC_SIGN_IN && data != null) {
            signInWithGoogle.handleSignInResult(
                intent = data,
                onSuccess = { viewModel.onSignInClicked(it) },
                onError = { viewModel.onException(it) }
            )
        }
    }

    private fun signIn(signInWithGoogle: SignInWithGoogle) {
        signInWithGoogle.silentSignIn()
            .doOnSubscribe { renderLoadingState() }
            .subscribe({
                showSignOutAndSignInDialog(
                    onNegative = { renderDefaultState() },
                    onConfirm = { signOutAndSignIn(signInWithGoogle) },
                    onDismissWithoutAction = { renderDefaultState() }
                )
            }, {
                startActivityForResult(signInWithGoogle.getSignInIntent(), LoginFragment.RC_SIGN_IN)
            })
            .disposeOnViewDestroyed()
    }

    private fun signOutAndSignIn(signInWithGoogle: SignInWithGoogle) {
        signInWithGoogle.signOut()
            .subscribe({
                startActivityForResult(signInWithGoogle.getSignInIntent(), LoginFragment.RC_SIGN_IN)
            }, {
                viewModel.onException(it)
            })
            .disposeOnViewDestroyed()
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
        binding.signInWithGoogleButton.isEnabled = true
        binding.errorTextView.isVisible = false
        hideProgress()
    }

    private fun renderLoadingState() {
        binding.signUpButton.isEnabled = false
        binding.signInWithGoogleButton.isEnabled = false
        binding.errorTextView.isVisible = false
        showProgress()
    }

    private fun renderSuccessState() {
        binding.signUpButton.isEnabled = false
        binding.signInWithGoogleButton.isEnabled = false
        //TODO какую-ниюудь галочку или что-то
        binding.errorTextView.isVisible = false
        hideProgress()
    }

    private fun renderErrorState(throwable: Throwable) {
        binding.signUpButton.isEnabled = true
        binding.signInWithGoogleButton.isEnabled = true
        binding.errorTextView.text = "Попробуйте ещё раз\nОшибка: ${throwable.localizedMessage}"
        binding.errorTextView.isVisible = true
        hideProgress()
    }

    private fun processViewState(authorisationViewState: AuthorisationViewState) {
        binding.emailEditText.error = null
        binding.passwordEditText.error = null

        @Suppress("WHEN_ENUM_CAN_BE_NULL_IN_JAVA")
        when (authorisationViewState.status) {
            AuthorisationViewState.Status.LOADING -> {
                renderLoadingState()
            }

            AuthorisationViewState.Status.SUCCESS -> {
                renderSuccessState()
                KeyboardUtils.hideKeyboard(view)

                navigateOnSuccess()
            }

            AuthorisationViewState.Status.ERROR -> {
                authorisationViewState.throwable?.also {
                    renderErrorState(it)
                }
            }
        }
    }

    private fun showProgress() {
        binding.progress.isVisible = true
        binding.progress.progress = 50
    }

    private fun hideProgress() {
        binding.progress.isVisible = false
        binding.progress.progress = 0
    }

    private fun navigateOnSuccess() {
        KeyboardUtils.hideKeyboard(view)
        viewModel.popOutOfAuth()
    }
}
