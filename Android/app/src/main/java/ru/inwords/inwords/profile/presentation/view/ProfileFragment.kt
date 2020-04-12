package ru.inwords.inwords.profile.presentation.view

import android.app.AlertDialog
import android.graphics.PointF
import android.net.Uri
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.content.res.ResourcesCompat
import androidx.core.view.isVisible
import com.facebook.imagepipeline.request.ImageRequestBuilder
import com.google.android.material.appbar.AppBarLayout
import com.google.android.material.snackbar.Snackbar
import io.reactivex.disposables.Disposable
import ru.inwords.inwords.R
import ru.inwords.inwords.authorisation.data.session.LastAuthInfoProvider
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.core.utils.KeyboardUtils
import ru.inwords.inwords.core.utils.observe
import ru.inwords.inwords.databinding.FragmentProfileBinding
import ru.inwords.inwords.policy.presentation.renderPolicyText
import ru.inwords.inwords.presentation.createAppBarNavIconOnScrimColorAnimatorListener
import ru.inwords.inwords.presentation.view_scenario.FragmentWithViewModelAndNav
import ru.inwords.inwords.profile.data.bean.User
import ru.inwords.inwords.profile.presentation.ProfileViewModelFactory


class ProfileFragment : FragmentWithViewModelAndNav<ProfileViewModel, ProfileViewModelFactory, FragmentProfileBinding>() {
    override val layout = R.layout.fragment_profile
    override val classType = ProfileViewModel::class.java

    override fun bindingInflate(inflater: LayoutInflater, container: ViewGroup?, attachToRoot: Boolean): FragmentProfileBinding {
        return FragmentProfileBinding.inflate(inflater, container, attachToRoot)
    }

    private var user: User? = null

    private var navIconAnimationListener: AppBarLayout.OnOffsetChangedListener? = null

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        val view = super.onCreateView(inflater, container, savedInstanceState)

        binding.headerBackground.hierarchy.setActualImageFocusPoint(PointF(0.5f, 0.75f))

        return view
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        viewModel.getLastAuthMethod()

        val colorCollapsed = ResourcesCompat.getColor(resources, R.color.colorPrimary, context?.theme)
        val colorExpanded = ResourcesCompat.getColor(resources, R.color.white, context?.theme)

        navIconAnimationListener = createAppBarNavIconOnScrimColorAnimatorListener(binding.toolbar, binding.collapsingToolbar, colorExpanded, colorCollapsed)
            .apply {
                binding.appbarLayout.addOnOffsetChangedListener(this)
            }

        setupWithNavController(binding.collapsingToolbar, binding.toolbar)

        binding.toLoginButton.setOnClickListener { viewModel.onNavigateToLoginClicked() }

        binding.settingsButton.setOnClickListener { viewModel.onNavigateToSettingsClicked() }

        binding.nameEditableField.onEditClickListener = editableFieldClickListener(binding.nameEditableField)
        binding.nameEditableField.onApplyClickListener = nameApplyClickListener()

        binding.emailEditableField.onEditClickListener = editableFieldClickListener(binding.emailEditableField)
        binding.emailEditableField.onApplyClickListener = emailApplyClickListener()

        binding.logoutButton.setOnClickListener { showLogoutDialog() }

        subscribeUser().disposeOnViewDestroyed()

        subscribeFieldUpdateResult(binding.nameEditableField) { getString(R.string.unable_to_change_nickname) }
        subscribeFieldUpdateResult(binding.emailEditableField) { it ?: getString(R.string.unable_to_change_email) }
        subscribeLogoutResult()

        binding.emailEditableField.defaultValueProvider = { user?.account?.email.orEmpty() }

        observe(viewModel.lastAuthMethod) {
            if (it == LastAuthInfoProvider.AuthMethod.NONE) {
                binding.logoutButton.isVisible = false
                binding.toLoginButton.text = getString(R.string.sign_in_enter)
            } else {
                binding.logoutButton.isVisible = true
                binding.toLoginButton.text = getString(R.string.change_account)
            }
        }

        renderPolicyText(binding.policyTextView)
    }

    private fun showLogoutDialog() {
        AlertDialog.Builder(requireContext())
            .setPositiveButton(getString(R.string.logout)) { _, _ -> viewModel.logout() }
            .setNegativeButton(getString(R.string.not_now)) { _, _ -> }
            .setTitle(getString(R.string.session_will_be_terminated))
            .setMessage(getString(R.string.logout_warning_message))
            .show()
    }

    override fun onDestroyView() {
        navIconAnimationListener?.let { binding.appbarLayout.removeOnOffsetChangedListener(it) }
        super.onDestroyView()
    }

    private fun subscribeUser(): Disposable {
        fun renderUser(userResource: Resource<User>) {
            if (userResource is Resource.Success) {
                val userData = userResource.data
                user = userData

                if (userData.avatar != null) {
                    val request = ImageRequestBuilder.newBuilderWithSource(Uri.parse(userData.avatar))
                        .setProgressiveRenderingEnabled(true)
                        .setLocalThumbnailPreviewsEnabled(true)
                        .build()

                    binding.avatarImage.setImageRequest(request)
                } else {
                    binding.avatarImage.setActualImageResource(R.drawable.ic_octopus1)
                }

                binding.nameEditableField.text = userData.userName
                binding.nameEditableField.setDefaultViewState()
                binding.nameEditableField.editButtonEnabled = true

                binding.emailEditableField.text = userData.account?.email.orEmpty()
                binding.emailEditableField.setDefaultViewState()
                binding.emailEditableField.editButtonEnabled = true
            } else {
                binding.avatarImage.setActualImageResource(R.drawable.ic_octopus1)

                binding.nameEditableField.setDefaultViewState()
                binding.nameEditableField.editButtonEnabled = false

                binding.emailEditableField.setDefaultViewState()
                binding.emailEditableField.editButtonEnabled = false
            }
        }

        return viewModel.profileDataSubject
            .observeOn(SchedulersFacade.ui())
            .subscribe(::renderUser)
    }

    private fun subscribeFieldUpdateResult(field: TextInputRemoteEditableField, errorTextProvider: (String?) -> String) {
        observe(viewModel.changeNicknameStatus) {
            when (it) {
                is Resource.Success -> {
                    field.setDefaultViewState()
                }
                is Resource.Loading -> {
                    field.setLoadingViewState()
                }
                is Resource.Error -> { //TODO error handling
                    field.setErrorViewState()

                    Snackbar.make(binding.root, errorTextProvider.invoke(it.message), Snackbar.LENGTH_LONG)
                        .show()
                }
            }
        }
    }

    private fun subscribeLogoutResult() {
        observe(viewModel.logoutStatus) {
            when (it) {
                is Resource.Success -> {
                    binding.logoutButton.isEnabled = false
                    binding.progress.root.isVisible = false
                }
                is Resource.Loading -> {
                    binding.logoutButton.isEnabled = false
                    binding.progress.root.isVisible = true
                }
                is Resource.Error -> { //TODO error handling
                    binding.logoutButton.isEnabled = true
                    binding.progress.root.isVisible = false

                    Snackbar.make(binding.root, getString(R.string.unable_to_logout), Snackbar.LENGTH_LONG)
                        .show()
                }
            }
        }
    }

    private fun nameApplyClickListener(): (View) -> Unit = fun(_) {
        val user = user ?: return

        val newUsername = binding.nameEditableField.text

        if (newUsername != user.userName) { //TODO validate also
            val newUser = user.copy(userName = newUsername)

            viewModel.updateUser(newUser)

            binding.nameEditableField.setLoadingViewState()
        } else {
            binding.nameEditableField.setDefaultViewState()
        }
    }

    private fun editableFieldClickListener(field: TextInputRemoteEditableField): (View) -> Unit = {
        field.setEditingViewState()
        KeyboardUtils.showKeyboard(field.rootView)
        field.setSelection(field.text.length)
    }

    private fun emailApplyClickListener(): (View) -> Unit = fun(_) {
        val user = user ?: return

        val newEmail = binding.emailEditableField.text

        if (newEmail != user.account?.email && newEmail.isNotBlank()) { //TODO validate also
            viewModel.updateEmail(newEmail) { getString(R.string.incorrect_input_email) }

            binding.emailEditableField.setLoadingViewState()
        } else {
            binding.emailEditableField.setDefaultViewState()
        }
    }
}
