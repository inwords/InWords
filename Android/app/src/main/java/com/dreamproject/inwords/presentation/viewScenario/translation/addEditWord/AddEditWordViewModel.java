package com.dreamproject.inwords.presentation.viewScenario.translation.addEditWord;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.dreamproject.inwords.core.util.Event;
import com.dreamproject.inwords.data.dto.WordTranslation;
import com.dreamproject.inwords.domain.interactor.translation.TranslationSyncInteractor;
import com.dreamproject.inwords.domain.interactor.translation.TranslationWordsInteractor;
import com.dreamproject.inwords.presentation.viewScenario.BasicViewModel;

import java.util.concurrent.TimeUnit;

import io.reactivex.Completable;
import io.reactivex.Observable;
import io.reactivex.disposables.Disposable;

public class AddEditWordViewModel extends BasicViewModel {
    private final MutableLiveData<Event<Boolean>> addEditDoneLiveData;

    private final TranslationWordsInteractor translationWordsInteractor;
    private final TranslationSyncInteractor translationSyncInteractor;

    public AddEditWordViewModel(final TranslationWordsInteractor translationWordsInteractor,
                                final TranslationSyncInteractor translationSyncInteractor) {
        this.translationWordsInteractor = translationWordsInteractor;
        this.translationSyncInteractor = translationSyncInteractor;

        this.addEditDoneLiveData = new MutableLiveData<>();
    }

    public void onEditWordDoneHandler(Observable<Object> clicksObservable,
                                      Observable<WordTranslation> wordTranslationObs,
                                      WordTranslation wordToEdit) {
        onAddEditWordDoneHandler(clicksObservable, wordTranslationObs, wordToEdit,
                wordTranslation -> translationWordsInteractor.update(wordToEdit, wordTranslation));
    }

    public void onAddWordDoneHandler(Observable<Object> clicksObservable,
                                     Observable<WordTranslation> wordTranslationObs) {
        onAddEditWordDoneHandler(clicksObservable, wordTranslationObs, null,
                translationWordsInteractor::addReplace);
    }

    private void onAddEditWordDoneHandler(Observable<Object> clicksObservable,
                                          Observable<WordTranslation> wordTranslationObs,
                                          WordTranslation wordToEdit,
                                          Action action) {
        Disposable d = clicksObservable
                .debounce(200, TimeUnit.MILLISECONDS)
                .switchMap(__ -> wordTranslationObs)
                .subscribe(wordTranslation ->
                        {
                            if (wordTranslation != null && !wordTranslation.equals(wordToEdit))
                                //noinspection ResultOfMethodCallIgnored
                                action.perform(wordTranslation)
                                        .subscribe(translationSyncInteractor::notifyDataChanged, Throwable::printStackTrace);
                            addEditDoneLiveData.postValue(new Event<>(true));
                        }
                );
        compositeDisposable.add(d);
    }

    public LiveData<Event<Boolean>> getAddEditDoneLiveData() {
        return addEditDoneLiveData;
    }

    interface Action {
        Completable perform(WordTranslation wordTranslation);
    }
}
