package ru.inwords.inwords.profile.presentation.view

import android.graphics.PointF
import android.net.Uri
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.navigation.Navigation
import com.facebook.imagepipeline.request.ImageRequestBuilder
import com.google.android.material.snackbar.Snackbar
import io.reactivex.disposables.Disposable
import kotlinx.android.synthetic.main.fragment_profile.*
import kotlinx.android.synthetic.main.fragment_profile.view.*
import ru.inwords.inwords.R
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.core.utils.KeyboardUtils
import ru.inwords.inwords.presentation.view_scenario.FragmentWithViewModelAndNav
import ru.inwords.inwords.presentation.view_scenario.renderPolicyText
import ru.inwords.inwords.profile.data.bean.User
import ru.inwords.inwords.profile.presentation.ProfileViewModelFactory


class ProfileFragment : FragmentWithViewModelAndNav<ProfileViewModel, ProfileViewModelFactory>() {
    override val layout = R.layout.fragment_profile
    override val classType = ProfileViewModel::class.java

    lateinit var user: User

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        val view = super.onCreateView(inflater, container, savedInstanceState)

        view.header_background.hierarchy.setActualImageFocusPoint(PointF(0.5f, 0.75f))

        return view
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        to_login_button.setOnClickListener(toLoginClickListener())

        settings_button.setOnClickListener(toSettingsClickListener())

        name_edit_edit_button.setOnClickListener(nameEditClickListener())
        name_edit_apply_button.setOnClickListener(nameApplyClickListener())

        subscribeUser().disposeOnViewDestroyed()

        subscribeNicknameUpdateResult()

        renderPolicyText(policy_text_view)
    }

    private fun subscribeUser(): Disposable {
        fun renderUser(userResource: Resource<User>) {
            if (userResource is Resource.Success) {
                user = userResource.data

                if (user.avatar != null) {
                    val request = ImageRequestBuilder.newBuilderWithSource(Uri.parse(user.avatar))
                            .setProgressiveRenderingEnabled(true)
                            .setLocalThumbnailPreviewsEnabled(true)
                            .build()

                    avatar_image.setImageRequest(request)
                } else {
                    avatar_image.setActualImageResource(R.drawable.ic_octopus1)
                }

                name_edit_text.setText(user.userName)

                renderDefaultViewState()
                name_edit_edit_button.isEnabled = true
            } else {
                avatar_image.setActualImageResource(R.drawable.ic_octopus1)

                renderDefaultViewState()
                name_edit_edit_button.isEnabled = false
            }
        }

        return viewModel.profileDataSubject
                .observeOn(SchedulersFacade.ui())
                .subscribe(::renderUser)
    }

    private fun subscribeNicknameUpdateResult() {
        viewModel.changeNickname.observe(this::getLifecycle) {
            when (it.contentIfNotHandled) {
                is Resource.Success -> {
                    renderDefaultViewState()
                }
                is Resource.Loading -> {
                    renderLoadingViewState()
                }
                is Resource.Error -> { //TODO error handling
                    renderErrorViewState()

                    Snackbar.make(profile_root, "Не удалось изменить ник. Попробуйте ещё раз", Snackbar.LENGTH_LONG)
                            .show()
                }
            }
        }
    }

    private fun renderDefaultViewState() {
        name_edit_progress.visibility = View.INVISIBLE
        name_edit_edit_button.visibility = View.VISIBLE
        name_edit_apply_button.visibility = View.INVISIBLE
        name_edit_text.isEnabled = false
    }

    private fun renderEditViewState() {
        name_edit_progress.visibility = View.INVISIBLE
        name_edit_edit_button.visibility = View.INVISIBLE
        name_edit_apply_button.visibility = View.VISIBLE
        name_edit_text.isEnabled = true
    }

    private fun renderLoadingViewState() {
        name_edit_progress.visibility = View.VISIBLE
        name_edit_edit_button.visibility = View.INVISIBLE
        name_edit_apply_button.visibility = View.INVISIBLE
        name_edit_text.isEnabled = false
    }

    private fun renderErrorViewState() {
        name_edit_progress.visibility = View.INVISIBLE
        name_edit_edit_button.visibility = View.INVISIBLE
        name_edit_apply_button.visibility = View.VISIBLE
        name_edit_text.isEnabled = true
    }

    private fun nameApplyClickListener() = View.OnClickListener {
        if (::user.isInitialized) {
            val newUsername = name_edit_text.text.toString()

            if (newUsername != user.userName) { //TODO validate also
                val newUser = user.copy(userName = newUsername, account = null)

                viewModel.updateUser(newUser)

                renderLoadingViewState()
            } else {
                renderDefaultViewState()
            }
        }
    }

    private fun nameEditClickListener() = View.OnClickListener {
        renderEditViewState()
        KeyboardUtils.showKeyboard(name_edit_text)
        name_edit_text.setSelection(name_edit_text.text?.length ?: 0)
    }

    private fun toLoginClickListener() = Navigation
            .createNavigateOnClickListener(R.id.action_profileFragment_to_loginFragment, null)

    private fun toSettingsClickListener() = Navigation
            .createNavigateOnClickListener(R.id.action_profileFragment_to_settingsFragment, null)
}
