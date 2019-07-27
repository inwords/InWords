package ru.inwords.inwords.presentation.viewScenario.profile

import android.os.Bundle
import android.view.View
import androidx.navigation.Navigation
import kotlinx.android.synthetic.main.fragment_profile.*
import ru.inwords.inwords.R
import ru.inwords.inwords.presentation.viewScenario.FragmentWithViewModelAndNav
import ru.inwords.inwords.presentation.viewScenario.renderPolicyText


class ProfileFragment : FragmentWithViewModelAndNav<ProfileViewModel, ProfileViewModelFactory>() {
    override val layout get() = R.layout.fragment_profile
    override val classType get() = ProfileViewModel::class.java

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        to_login_button.setOnClickListener(toLoginClickListener())

        renderPolicyText(policy_text_view)
    }

    private fun toLoginClickListener() = Navigation
            .createNavigateOnClickListener(R.id.action_profileFragment_to_loginFragment, null)
}
