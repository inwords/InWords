package ru.inwords.inwords.presentation.viewScenario.authorisation.login;

import io.reactivex.Completable;
import ru.inwords.inwords.data.dto.UserCredentials;
import ru.inwords.inwords.domain.interactor.authorisation.AuthorisationInteractor;
import ru.inwords.inwords.presentation.viewScenario.authorisation.AuthorisationViewModel;

public class LoginViewModel extends AuthorisationViewModel {

    public LoginViewModel(AuthorisationInteractor authorisationInteractor) {
        super(authorisationInteractor);
    }

    @Override
    protected Completable performAuthAction(UserCredentials userCredentials) {
        return authorisationInteractor.signIn(userCredentials);
    }
}
