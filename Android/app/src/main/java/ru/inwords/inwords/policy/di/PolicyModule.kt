package ru.inwords.inwords.policy.di

import dagger.Module
import dagger.Provides
import ru.inwords.inwords.authorisation.domain.interactor.AuthorisationInteractor
import ru.inwords.inwords.main_activity.data.repository.integration.IntegrationDatabaseRepository
import ru.inwords.inwords.policy.domain.interactor.PolicyInteractor
import ru.inwords.inwords.policy.presentation.PolicyViewModelFactory
import javax.inject.Singleton

@Module
class PolicyModule {
    @Provides
    @Singleton
    fun policyInteractor(integrationDatabaseRepository: IntegrationDatabaseRepository): PolicyInteractor {
        return PolicyInteractor(integrationDatabaseRepository)
    }

    @Provides
    fun providePolicyViewModelFactory(policyInteractor: PolicyInteractor, authorisationInteractor: AuthorisationInteractor): PolicyViewModelFactory {
        return PolicyViewModelFactory(policyInteractor, authorisationInteractor)
    }
}