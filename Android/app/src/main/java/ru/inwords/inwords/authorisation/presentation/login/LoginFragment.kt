package ru.inwords.inwords.authorisation.presentation.login

import android.content.Intent
import android.os.Bundle
import android.util.Log
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
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.core.utils.KeyboardUtils
import ru.inwords.inwords.core.utils.observe
import ru.inwords.inwords.core.validation.ValidationResult
import ru.inwords.inwords.databinding.FragmentSignInBinding
import ru.inwords.inwords.presentation.view_scenario.FragmentWithViewModelAndNav
import ru.inwords.inwords.profile.data.bean.UserCredentials
import javax.inject.Inject


class LoginFragment : FragmentWithViewModelAndNav<LoginViewModel, AuthorisationViewModelFactory, FragmentSignInBinding>() {
    override val layout = R.layout.fragment_sign_in
    override val classType = LoginViewModel::class.java

    private val args by navArgs<LoginFragmentArgs>()

    @Inject
    lateinit var signInWithGoogle: SignInWithGoogle

    override fun bindingInflate(inflater: LayoutInflater, container: ViewGroup?, attachToRoot: Boolean): FragmentSignInBinding {
        return FragmentSignInBinding.inflate(inflater, container, attachToRoot)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setupWithNavController(binding.toolbar)

        setupValidation()

        signInWithGoogle.silentSignIn()
            .subscribeOn(SchedulersFacade.io())
            .subscribe({
                it.idToken
            }, {
                Log.e(javaClass.simpleName, it.message.orEmpty())
            })
            .disposeOnViewDestroyed()

        binding.signInWithGoogleButton.setOnClickListener { signIn(signInWithGoogle) }

        binding.buttonEnterSignIn.setOnClickListener {
            viewModel.onSignInClicked(
                UserCredentials(
                    email = binding.emailEditText.text?.toString().orEmpty(),
                    password = binding.passwordEditText.text?.toString().orEmpty()
                )
            )
        }
        binding.textViewSignUp.setOnClickListener { viewModel.onNavigateToRegistrationClicked(args.onTopOfRegistration) } //TODO clicks

        observe(viewModel.authorisationState) {
            processViewState(it)
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        if (requestCode == RC_SIGN_IN && data != null) {
            signInWithGoogle.handleSignInResult(
                intent = data,
                onSuccess = { it.id },
                onError = { }
            )
        }
    }

    private fun signIn(signInWithGoogle: SignInWithGoogle) {
        startActivityForResult(signInWithGoogle.getSignInIntent(), RC_SIGN_IN)
    }

    private fun setupValidation() {
        binding.emailEditText.addTextChangedListener(AfterTextChangedWatcher { binding.emailLayout.error = null })
        binding.passwordEditText.addTextChangedListener(AfterTextChangedWatcher { binding.passwordLayout.error = null })

        observe(viewModel.validationLiveData) {
            if (it.emailState is ValidationResult.Error) {
                binding.emailLayout.error = it.emailState.message
                renderDefaultState()
            }
            if (it.passwordState is ValidationResult.Error) {
                binding.passwordLayout.error = it.passwordState.message
                renderDefaultState()
            }
        }
    }

    private fun renderDefaultState() {
        binding.buttonEnterSignIn.isEnabled = true
        binding.errorTextView.isVisible = false
        hideProgress()
    }

    private fun renderLoadingState() {
        binding.buttonEnterSignIn.isEnabled = false
        binding.errorTextView.isVisible = false
        showProgress()
    }

    private fun renderSuccessState() {
        binding.buttonEnterSignIn.isEnabled = false
        //TODO какую-ниюудь галочку или что-то
        binding.errorTextView.isVisible = false
        hideProgress()
    }

    private fun renderErrorState(throwable: Throwable) {
        binding.buttonEnterSignIn.isEnabled = true
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

    companion object {
        const val RC_SIGN_IN = 1
    }
}
