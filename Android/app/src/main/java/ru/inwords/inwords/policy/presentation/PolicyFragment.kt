package ru.inwords.inwords.policy.presentation

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import ru.inwords.inwords.R
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.databinding.FragmentPolicyBinding
import ru.inwords.inwords.presentation.view_scenario.FragmentWithViewModelAndNav

class PolicyFragment : FragmentWithViewModelAndNav<PolicyViewModel, PolicyViewModelFactory, FragmentPolicyBinding>() {
    override val layout = R.layout.fragment_policy
    override val classType = PolicyViewModel::class.java

    override fun bindingInflate(inflater: LayoutInflater, container: ViewGroup?, attachToRoot: Boolean): FragmentPolicyBinding {
        return FragmentPolicyBinding.inflate(inflater, container, attachToRoot)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding.startButton.setOnClickListener {
            binding.startButton.isEnabled = false

            viewModel.setPolicyAgreementState(true)
                .subscribeOn(SchedulersFacade.io())
                .observeOn(SchedulersFacade.ui())
                .subscribe { viewModel.popBack() }
        }

        renderPolicyText(binding.policyTextView)
    }
}
