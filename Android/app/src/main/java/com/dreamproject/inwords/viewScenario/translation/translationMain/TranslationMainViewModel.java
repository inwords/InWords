package com.dreamproject.inwords.viewScenario.translation.translationMain;

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

public class TranslationMainViewModel extends BasicViewModel {
    private final MutableLiveData<Event<WordTranslation>> addEditWordLiveData;

    private final TranslationWordsInteractor translationWordsInteractor;
    private TranslationSyncInteractor translationSyncInteractor;

    TranslationMainViewModel(final TranslationWordsInteractor translationWordsInteractor,
                             final TranslationSyncInteractor translationSyncInteractor) {
        this.translationWordsInteractor = translationWordsInteractor;
        this.translationSyncInteractor = translationSyncInteractor;

        this.addEditWordLiveData = new MutableLiveData<>();
    }

    public void onItemDismiss(WordTranslation wordTranslation) {
        compositeDisposable.add(translationWordsInteractor.remove(wordTranslation)
                .subscribe(translationSyncInteractor::notifyDataChanged, Throwable::printStackTrace));
    }

    public void onAddClickedHandler(Observable<Object> clicksObservable) { //fab clicked
        compositeDisposable.add(clicksObservable
                .debounce(200, TimeUnit.MILLISECONDS)
                .subscribe(__ -> addEditWordLiveData.postValue(new Event<>(null))));
    }

    public void onEditClicked(Observable<WordTranslation> clicksObservable) { //clickListener on item
        compositeDisposable.add(clicksObservable
                .debounce(200, TimeUnit.MILLISECONDS)
                .subscribe(wordTranslation -> addEditWordLiveData.postValue(new Event<>(wordTranslation))));
    }

    public Observable<List<WordTranslation>> getTranslationWordsStream() {
        return translationWordsInteractor.getAllWords();
    }

    public LiveData<Event<WordTranslation>> getAddEditWordLiveData() {
        return addEditWordLiveData;
    }
}
