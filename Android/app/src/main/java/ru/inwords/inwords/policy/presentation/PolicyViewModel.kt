package ru.inwords.inwords.policy.presentation

import android.util.Log
import io.reactivex.disposables.Disposable
import ru.inwords.inwords.authorisation.data.session.LastAuthInfoProvider
import ru.inwords.inwords.authorisation.domain.interactor.AuthorisationInteractor
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.policy.domain.interactor.PolicyInteractor
import ru.inwords.inwords.presentation.view_scenario.BasicViewModel

class PolicyViewModel internal constructor(
    private val policyInteractor: PolicyInteractor,
    private val authorisationInteractor: AuthorisationInteractor
) : BasicViewModel() {
    fun agreeWithPolicy(): Disposable {
        return policyInteractor.setPolicyAgreementState(true)
            .andThen(authorisationInteractor.getLastAuthMethod())
            .subscribeOn(SchedulersFacade.io())
            .observeOn(SchedulersFacade.ui())
            .subscribe({
                if (it == LastAuthInfoProvider.AuthMethod.NONE) {
                    navigateTo(PolicyFragmentDirections.toChooseSignMethodFragment())
                } else {
                    navigateTo(PolicyFragmentDirections.actionPolicyFragmentPop())
                }
            }, {
                Log.wtf(TAG, it)
            })
    }

    companion object {
        const val TAG = "PolicyViewModel"
    }
}
