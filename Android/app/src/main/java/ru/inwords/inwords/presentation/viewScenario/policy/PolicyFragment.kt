package ru.inwords.inwords.presentation.viewScenario.policy

import android.os.Bundle
import android.view.View
import kotlinx.android.synthetic.main.fragment_policy.*
import kotlinx.android.synthetic.main.fragment_profile.policy_text_view
import ru.inwords.inwords.R
import ru.inwords.inwords.core.util.SchedulersFacade
import ru.inwords.inwords.presentation.viewScenario.FragmentWithViewModelAndNav
import ru.inwords.inwords.presentation.viewScenario.renderPolicyText

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
                    .subscribe { navController.navigate(R.id.action_policyFragment_pop) }
        }

        renderPolicyText(policy_text_view)
    }
}
