package com.dreamproject.inwords.presentation.viewScenario.main;

import com.dreamproject.inwords.presentation.viewScenario.BasicViewModel;
import com.dreamproject.inwords.domain.interactor.translation.TranslationSyncInteractor;
import com.dreamproject.inwords.domain.interactor.translation.TranslationWordsInteractor;

import io.reactivex.Observable;

//compositeDisposable, model and application are available from BasicPresenter
public class MainViewModel extends BasicViewModel {
    private final TranslationWordsInteractor translationWordsInteractor;
    private final TranslationSyncInteractor translationSyncInteractor;

    MainViewModel(final TranslationWordsInteractor translationWordsInteractor,
                  final TranslationSyncInteractor translationSyncInteractor) {
        this.translationWordsInteractor = translationWordsInteractor;
        this.translationSyncInteractor = translationSyncInteractor;
    }

    public void onGetAllHandler(Observable<Object> obs) {
        compositeDisposable.add(
                obs.subscribe(o -> {
                    translationSyncInteractor.presyncOnStart().blockingGet();

                    translationSyncInteractor.trySyncAllReposWithCache().blockingGet();

                    compositeDisposable.add(
                            translationWordsInteractor.getAllWords().subscribe(System.out::println)
                    );
                }));
    }

}
