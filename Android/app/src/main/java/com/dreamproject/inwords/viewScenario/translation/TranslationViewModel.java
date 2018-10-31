package com.dreamproject.inwords.viewScenario.translation;

import android.arch.lifecycle.LiveData;
import android.arch.lifecycle.MutableLiveData;

import com.dreamproject.inwords.BasicViewModel;
import com.dreamproject.inwords.data.entity.WordTranslation;
import com.dreamproject.inwords.data.interactor.translation.TranslationSyncInteractor;
import com.dreamproject.inwords.data.interactor.translation.TranslationWordsInteractor;

import java.util.List;

import io.reactivex.disposables.Disposable;

public class TranslationViewModel extends BasicViewModel {
    private final MutableLiveData<List<WordTranslation>> translationWordsLiveData;
    private final MutableLiveData<WordTranslation> addEditWordLiveData;

    private final TranslationWordsInteractor translationWordsInteractor;
    private TranslationSyncInteractor translationSyncInteractor;

    TranslationViewModel(final TranslationWordsInteractor translationWordsInteractor,
                         final TranslationSyncInteractor translationSyncInteractor) {
        this.translationWordsInteractor = translationWordsInteractor;
        this.translationSyncInteractor = translationSyncInteractor;

        this.translationWordsLiveData = new MutableLiveData<>();
        this.addEditWordLiveData = new MutableLiveData<>();
    }

    public void onViewCreated() {
        Disposable d = translationWordsInteractor.getAllWords()
                .subscribe(translationWordsLiveData::postValue, Throwable::printStackTrace);

        compositeDisposable.add(d);
    }

    public void onAddWordTranslation(WordTranslation wordTranslation) {
        Disposable d = translationWordsInteractor.addWordTranslation(wordTranslation)
                .subscribe(translationSyncInteractor::notifyDataChanged, Throwable::printStackTrace);

        compositeDisposable.add(d);
    }

    public void onItemDismiss(WordTranslation wordTranslation) {
        Disposable d = translationWordsInteractor.removeWordTranslation(wordTranslation)
                .subscribe(translationSyncInteractor::notifyDataChanged, Throwable::printStackTrace);

        compositeDisposable.add(d);
    }

    public void onAddEditWord(WordTranslation wordTranslation){
        addEditWordLiveData.postValue(wordTranslation);
    }

    public void onAddEditWordDone(WordTranslation wordTranslation){
        if (wordTranslation != null)
            translationWordsInteractor.addWordTranslation(wordTranslation);
    }

    public LiveData<List<WordTranslation>> getTranslationWordsLiveData() {
        return translationWordsLiveData;
    }

    public LiveData<WordTranslation> getAddEditWordLiveData() {
        return addEditWordLiveData;
    }
}
