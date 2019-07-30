package ru.inwords.inwords.presentation.viewScenario.profile

import android.graphics.PointF
import android.net.Uri
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.navigation.Navigation
import com.facebook.imagepipeline.request.ImageRequestBuilder
import io.reactivex.disposables.Disposable
import kotlinx.android.synthetic.main.fragment_profile.*
import kotlinx.android.synthetic.main.fragment_profile.view.*
import ru.inwords.inwords.R
import ru.inwords.inwords.core.util.SchedulersFacade
import ru.inwords.inwords.data.dto.User
import ru.inwords.inwords.domain.model.Resource
import ru.inwords.inwords.presentation.viewScenario.FragmentWithViewModelAndNav
import ru.inwords.inwords.presentation.viewScenario.renderPolicyText


class ProfileFragment : FragmentWithViewModelAndNav<ProfileViewModel, ProfileViewModelFactory>() {
    override val layout get() = R.layout.fragment_profile
    override val classType get() = ProfileViewModel::class.java

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        val view = super.onCreateView(inflater, container, savedInstanceState)

        view.header_background.hierarchy.setActualImageFocusPoint(PointF(0.5f, 0.75f))

        return view
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        to_login_button.setOnClickListener(toLoginClickListener())

        settings_button.setOnClickListener(toSettingsClickListener())

        subscribeUser()

        renderPolicyText(policy_text_view)
    }

    private fun subscribeUser(): Disposable {
        fun renderUser(userResource: Resource<User>) {
            if (userResource is Resource.Success && userResource.data.avatar != null) {
                val request = ImageRequestBuilder.newBuilderWithSource(Uri.parse(userResource.data.avatar))
                        .setProgressiveRenderingEnabled(true)
                        .setLocalThumbnailPreviewsEnabled(true)
                        .build()

                avatar_image.setImageRequest(request)
            } else {
                avatar_image.setActualImageResource(R.drawable.ic_octopus1)
            }
        }

        return viewModel.profileDataSubject
                .observeOn(SchedulersFacade.ui())
                .subscribe(::renderUser)
    }

    private fun toLoginClickListener() = Navigation
            .createNavigateOnClickListener(R.id.action_profileFragment_to_loginFragment, null)

    private fun toSettingsClickListener() = Navigation
            .createNavigateOnClickListener(R.id.action_profileFragment_to_settingsFragment, null)
}
