package com.dreamproject.inwords.viewScenario.translation;

import android.arch.lifecycle.LiveData;
import android.arch.lifecycle.MutableLiveData;

import com.dreamproject.inwords.BasicViewModel;
import com.dreamproject.inwords.Event;
import com.dreamproject.inwords.data.entity.WordTranslation;
import com.dreamproject.inwords.data.interactor.translation.TranslationSyncInteractor;
import com.dreamproject.inwords.data.interactor.translation.TranslationWordsInteractor;

import java.util.List;
import java.util.concurrent.TimeUnit;

import io.reactivex.Observable;
import io.reactivex.disposables.Disposable;

public class TranslationViewModel extends BasicViewModel {
    private final MutableLiveData<List<WordTranslation>> translationWordsLiveData;
    private final MutableLiveData<Event<WordTranslation>> addEditWordLiveData;

    private final TranslationWordsInteractor translationWordsInteractor;
    private TranslationSyncInteractor translationSyncInteractor;

    private WordTranslation wordToEdit;

    TranslationViewModel(final TranslationWordsInteractor translationWordsInteractor,
                         final TranslationSyncInteractor translationSyncInteractor) {
        this.translationWordsInteractor = translationWordsInteractor;
        this.translationSyncInteractor = translationSyncInteractor;

        this.translationWordsLiveData = new MutableLiveData<>();
        this.addEditWordLiveData = new MutableLiveData<>();
    }

    public void onAddClickedHandler(Observable<Object> clicksObservable) {
        Disposable d = clicksObservable
                .debounce(200, TimeUnit.MILLISECONDS)
                .subscribe(__ -> addEditWordLiveData.postValue(new Event<>(null)));
        compositeDisposable.add(d);
    }

    public void onViewCreated() {
        Disposable d = translationWordsInteractor.getAllWords()
                .subscribe(translationWordsLiveData::postValue, Throwable::printStackTrace);

        //compositeDisposable.addReplace(d);
    }

    public void onAddWordTranslation(WordTranslation wordTranslation) {
        Disposable d = translationWordsInteractor.addReplace(wordTranslation)
                .subscribe(translationSyncInteractor::notifyDataChanged, Throwable::printStackTrace);

        //compositeDisposable.addReplace(d);
    }

    public void onItemDismiss(WordTranslation wordTranslation) {
        Disposable d = translationWordsInteractor.remove(wordTranslation)
                .subscribe(translationSyncInteractor::notifyDataChanged, Throwable::printStackTrace);

        //compositeDisposable.addReplace(d);
    }

    public void onEditClicked(WordTranslation wordTranslation) {
        wordToEdit = wordTranslation.clone();
        addEditWordLiveData.postValue(new Event<>(wordTranslation));
    }

    public void onEditWordDone(WordTranslation wordTranslation) {
        if (wordTranslation != null && !wordToEdit.equals(wordTranslation))
            translationWordsInteractor.update(wordToEdit, wordTranslation); //Yes "UPDATE" is important
    }                                                                       //because of sync

    public LiveData<List<WordTranslation>> getTranslationWordsLiveData() {
        return translationWordsLiveData;
    }

    public LiveData<Event<WordTranslation>> getAddEditWordLiveData() {
        return addEditWordLiveData;
    }
}
