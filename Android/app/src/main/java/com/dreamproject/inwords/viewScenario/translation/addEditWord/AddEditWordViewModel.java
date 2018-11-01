package com.dreamproject.inwords.viewScenario.translation.addEditWord;

import android.annotation.SuppressLint;
import android.arch.lifecycle.LiveData;
import android.arch.lifecycle.MutableLiveData;

import com.dreamproject.inwords.BasicViewModel;
import com.dreamproject.inwords.Event;
import com.dreamproject.inwords.data.entity.WordTranslation;
import com.dreamproject.inwords.data.interactor.translation.TranslationSyncInteractor;
import com.dreamproject.inwords.data.interactor.translation.TranslationWordsInteractor;

import java.util.concurrent.TimeUnit;

import io.reactivex.Observable;
import io.reactivex.disposables.Disposable;

public class AddEditWordViewModel extends BasicViewModel {
    private final MutableLiveData<Event<Boolean>> addEditDoneLiveData;

    private final TranslationWordsInteractor translationWordsInteractor;
    private TranslationSyncInteractor translationSyncInteractor;

    AddEditWordViewModel(final TranslationWordsInteractor translationWordsInteractor,
                         final TranslationSyncInteractor translationSyncInteractor) {
        this.translationWordsInteractor = translationWordsInteractor;
        this.translationSyncInteractor = translationSyncInteractor;

        this.addEditDoneLiveData = new MutableLiveData<>();
    }

    @SuppressLint("CheckResult")
    private void addWordTranslation(WordTranslation wordTranslation) {
        //noinspection ResultOfMethodCallIgnored
        translationWordsInteractor.addReplace(wordTranslation)
                .subscribe(translationSyncInteractor::notifyDataChanged, Throwable::printStackTrace);
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
                this::addWordTranslation);
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
                                action.perform(wordTranslation);
                            addEditDoneLiveData.postValue(new Event<>(true));
                        }
                );
        compositeDisposable.add(d);
    }

    public LiveData<Event<Boolean>> getAddEditDoneLiveData() {
        return addEditDoneLiveData;
    }

    interface Action {
        void perform(WordTranslation wordTranslation);
    }
}
