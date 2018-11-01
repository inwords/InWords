package com.dreamproject.inwords.viewScenario.translation.translationMain;

import android.annotation.SuppressLint;
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

public class TranslationMainViewModel extends BasicViewModel {
    private final MutableLiveData<List<WordTranslation>> translationWordsLiveData;
    private final MutableLiveData<Event<WordTranslation>> addEditWordLiveData;

    private final TranslationWordsInteractor translationWordsInteractor;
    private TranslationSyncInteractor translationSyncInteractor;

    @SuppressLint("CheckResult")
    TranslationMainViewModel(final TranslationWordsInteractor translationWordsInteractor,
                             final TranslationSyncInteractor translationSyncInteractor) {
        this.translationWordsInteractor = translationWordsInteractor;
        this.translationSyncInteractor = translationSyncInteractor;

        this.translationWordsLiveData = new MutableLiveData<>();
        this.addEditWordLiveData = new MutableLiveData<>();

        //noinspection ResultOfMethodCallIgnored
        translationWordsInteractor.getAllWords()
                .subscribe(translationWordsLiveData::postValue, Throwable::printStackTrace);
    }

    @SuppressLint("CheckResult")
    public void onItemDismiss(WordTranslation wordTranslation) {
        //noinspection ResultOfMethodCallIgnored
        translationWordsInteractor.remove(wordTranslation)
                .subscribe(translationSyncInteractor::notifyDataChanged, Throwable::printStackTrace);
    }

    public void onAddClickedHandler(Observable<Object> clicksObservable) { //fab clicked
        Disposable d = clicksObservable
                .debounce(200, TimeUnit.MILLISECONDS)
                .subscribe(__ -> addEditWordLiveData.postValue(new Event<>(null)));
        compositeDisposable.add(d);
    }

    public void onEditClicked(Observable<WordTranslation> clicksObservable) { //clickListener on item
        Disposable d = clicksObservable
                .debounce(200, TimeUnit.MILLISECONDS)
                .subscribe(wordTranslation -> addEditWordLiveData.postValue(new Event<>(wordTranslation)));
        compositeDisposable.add(d);
    }

    public LiveData<List<WordTranslation>> getTranslationWordsLiveData() {
        return translationWordsLiveData;
    }

    public LiveData<Event<WordTranslation>> getAddEditWordLiveData() {
        return addEditWordLiveData;
    }
}
