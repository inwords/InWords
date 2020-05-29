package ru.inwords.inwords.authorisation.presentation.choose_method

import android.content.Context
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.activity.OnBackPressedCallback
import androidx.core.view.isVisible
import ru.inwords.inwords.R
import ru.inwords.inwords.authorisation.presentation.AuthorisationViewModelFactory
import ru.inwords.inwords.authorisation.presentation.AuthorisationViewState
import ru.inwords.inwords.core.utils.observe
import ru.inwords.inwords.databinding.FragmentChooseSignMethodBinding
import ru.inwords.inwords.presentation.view_scenario.FragmentWithViewModelAndNav

class ChooseSignMethodFragment : FragmentWithViewModelAndNav<ChooseSignMethodViewModel, AuthorisationViewModelFactory, FragmentChooseSignMethodBinding>() {
    override val layout = R.layout.fragment_choose_sign_method
    override val classType = ChooseSignMethodViewModel::class.java

    override fun bindingInflate(inflater: LayoutInflater, container: ViewGroup?, attachToRoot: Boolean): FragmentChooseSignMethodBinding {
        return FragmentChooseSignMethodBinding.inflate(inflater, container, attachToRoot)
    }

    override fun onAttach(context: Context) {
        super.onAttach(context)

        val callback = object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                requireActivity().finish()
            }
        }
        requireActivity().onBackPressedDispatcher.addCallback(this, callback)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding.signUpButton.setOnClickListener { viewModel.onNavigateToSignUpClicked() }
        binding.signInGuestButton.setOnClickListener { viewModel.onSignInGuestClicked() }

        observe(viewModel.authorisationState) {
            processViewState(it)
        }
    }

    private fun renderLoadingState() {
        binding.signInGuestButton.isEnabled = false
        binding.errorTextView.isVisible = false
        showProgress()
    }

    private fun renderSuccessState() {
        binding.signInGuestButton.isEnabled = false
        //TODO какую-нибудь галочку или что-то
        binding.errorTextView.isVisible = false
        hideProgress()
    }

    private fun renderErrorState(message: String) {
        binding.signInGuestButton.isEnabled = true
        binding.errorTextView.text = message
        binding.errorTextView.isVisible = true
        hideProgress()
    }

    private fun processViewState(authorisationViewState: AuthorisationViewState) {
        when (authorisationViewState.status) {
            AuthorisationViewState.Status.LOADING -> renderLoadingState()
            AuthorisationViewState.Status.SUCCESS -> renderSuccessState()
            AuthorisationViewState.Status.ERROR -> renderErrorState(authorisationViewState.errorMessage.orEmpty())
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
}
