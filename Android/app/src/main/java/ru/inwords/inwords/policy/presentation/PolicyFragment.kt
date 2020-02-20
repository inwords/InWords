package ru.inwords.inwords.policy.presentation

import android.os.Bundle
import android.view.View
import kotlinx.android.synthetic.main.fragment_policy.*
import kotlinx.android.synthetic.main.fragment_profile.policy_text_view
import ru.inwords.inwords.R
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.presentation.view_scenario.FragmentWithViewModelAndNav

class PolicyFragment : FragmentWithViewModelAndNav<PolicyViewModel, PolicyViewModelFactory>() {
    override val layout = R.layout.fragment_policy
    override val classType = PolicyViewModel::class.java

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        start_button.setOnClickListener {
            start_button.isEnabled = false

            viewModel.setPolicyAgreementState(true)
                .subscribeOn(SchedulersFacade.io())
                .observeOn(SchedulersFacade.ui())
                .subscribe { viewModel.popBack() }
        }

        renderPolicyText(policy_text_view)
    }
}
