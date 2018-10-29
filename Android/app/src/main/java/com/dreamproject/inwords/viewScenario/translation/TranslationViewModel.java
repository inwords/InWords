package com.dreamproject.inwords.viewScenario.translation;

import android.arch.lifecycle.LiveData;
import android.arch.lifecycle.MutableLiveData;
import android.content.Context;

import com.dreamproject.inwords.BasicViewModel;
import com.dreamproject.inwords.data.entity.WordTranslation;
import com.dreamproject.inwords.model.translation.TranslationModel;
import com.dreamproject.inwords.util.DependenciesComponent;

import java.util.List;

import io.reactivex.disposables.Disposable;

public class TranslationViewModel extends BasicViewModel {
    private final MutableLiveData<List<WordTranslation>> translationWordsLiveData;
    private TranslationModel model;

    TranslationViewModel(Context context) {
        model = DependenciesComponent.getTranslationModelInstance(context);

        this.translationWordsLiveData = new MutableLiveData<>();
    }

    public void onViewCreated() {
        Disposable d = model.getAllWords()
                .subscribe(translationWordsLiveData::postValue, Throwable::printStackTrace);

        compositeDisposable.add(d);
    }

    public void onAddWordTranslation(WordTranslation wordTranslation) {
        Disposable d = model.addWordTranslation(wordTranslation)
                .subscribe(() -> model.notifyDataChanged(), Throwable::printStackTrace);

        compositeDisposable.add(d);
    }

    public void onItemDismiss(WordTranslation wordTranslation) {
        onRemoveWordTranslation(wordTranslation);
    }

    private void onRemoveWordTranslation(WordTranslation wordTranslation) {
        Disposable d = model.removeWordTranslation(wordTranslation)
                .subscribe(() -> model.notifyDataChanged(), Throwable::printStackTrace);

        compositeDisposable.add(d);
    }

    public LiveData<List<WordTranslation>> getTranslationWordsLiveData() {
        return translationWordsLiveData;
    }
}
