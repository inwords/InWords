package ru.inwords.inwords.presentation.viewScenario.authorisation

import android.os.Bundle
import android.view.View
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider

import com.google.android.material.textfield.TextInputEditText

import io.reactivex.Observable
import io.reactivex.functions.BiFunction
import ru.inwords.inwords.R
import ru.inwords.inwords.core.util.Event
import ru.inwords.inwords.data.dto.UserCredentials
import ru.inwords.inwords.presentation.custom_views.button.ActionProcessButton
import ru.inwords.inwords.presentation.viewScenario.FragmentWithViewModelAndNav

abstract class SigningBaseFragment<ViewModelType : AuthorisationViewModel, ViewModelFactory : ViewModelProvider.Factory> : FragmentWithViewModelAndNav<ViewModelType, ViewModelFactory>() {
    protected lateinit var editTextEmail: TextInputEditText
    protected lateinit var editTextPassword: TextInputEditText
    protected lateinit var buttonTrySign: ActionProcessButton

    protected open val credentials: Observable<UserCredentials> //TODO: validate input
        get() = Observable.zip(
                Observable.fromCallable { editTextEmail.text?.toString().orEmpty() },
                Observable.fromCallable { editTextPassword.text?.toString().orEmpty() },
                BiFunction<String, String, UserCredentials> { email, password ->
                    UserCredentials(email, password)
                })

    protected abstract val buttonId: Int

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        editTextEmail = view.findViewById(R.id.editTextEmail)
        editTextPassword = view.findViewById(R.id.editTextPassword)
        buttonTrySign = view.findViewById(buttonId)
        buttonTrySign.setMode(ActionProcessButton.Mode.ENDLESS)

        viewModel.navigateTo.observe(this, Observer { event ->
            if (event?.contentIfNotHandled != null) {
                navigateAction()
            }
        })
        viewModel.authorisationState.observe(this, Observer {
            this.processViewState(it)
        })
    }

    protected abstract fun navigateAction()

    protected abstract fun navigateOnSuccess()

    protected fun renderLoadingState() {
        buttonTrySign.isEnabled = false

        buttonTrySign.progress = 50
    }

    private fun renderSuccessState() {
        buttonTrySign.isEnabled = false

        buttonTrySign.progress = 100
    }

    private fun renderErrorState(throwable: Throwable) {
        buttonTrySign.isEnabled = true

        buttonTrySign.errorText = "Попробуйте ещё раз\nОшибка: " + throwable.localizedMessage
        buttonTrySign.progress = -1
    }

    private fun processViewState(viewStateEvent: Event<AuthorisationViewState>) {
        editTextEmail.error = null
        editTextPassword.error = null

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
                val viewState = viewStateEvent.peekContent()
                if (viewState.throwable != null) {
                    renderErrorState(viewState.throwable)
                }
            }

            AuthorisationViewState.Status.INVALID_EMAIL -> {
                editTextEmail.error = authorisationViewState.invalidEmailMessage
                buttonTrySign.progress = -1
            }

            AuthorisationViewState.Status.INVALID_PASSWORD -> {
                editTextPassword.error = authorisationViewState.invalidPasswordMessage
                buttonTrySign.progress = -1
            }

            AuthorisationViewState.Status.INVALID_INPUT -> {
                editTextEmail.error = authorisationViewState.invalidEmailMessage
                editTextPassword.error = authorisationViewState.invalidPasswordMessage
                buttonTrySign.progress = -1
            }
        }
    }
}
