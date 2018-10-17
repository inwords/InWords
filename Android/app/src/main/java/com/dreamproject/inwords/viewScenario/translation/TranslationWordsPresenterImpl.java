package com.dreamproject.inwords.viewScenario.translation;

import android.app.Application;

import com.dreamproject.inwords.BasicPresenter;
import com.dreamproject.inwords.data.entity.WordTranslation;
import com.dreamproject.inwords.viewScenario.translation.recycler.ItemTouchHelperEvents;

import io.reactivex.disposables.Disposable;

public class TranslationWordsPresenterImpl extends BasicPresenter implements
        TranslationWordsPresenter,
        ItemTouchHelperEvents {

    private TranslationMainView translationMainView;

    TranslationWordsPresenterImpl(Application application, TranslationMainView translationMainView) {
        super(application);

        this.translationMainView = translationMainView;
    }

    @Override
    public void onLoadData() {
        //model.presyncOnStart(application);

        Disposable d = model.getAllWords()
                .concatMapCompletable(wordTranslations -> translationMainView.updateWordTranslations(wordTranslations))
                .subscribe(() -> {
                }, Throwable::printStackTrace);

        compositeDisposable.add(d);
    }

    @Override
    public void onRemoveWordTranslation(WordTranslation wordTranslation) {
        Disposable d = model.removeWordTranslation(wordTranslation)
                .subscribe(() -> {
                    model.trySyncAllReposWithCache().blockingGet();
                }, Throwable::printStackTrace);

        compositeDisposable.add(d);
    }

    @Override
    public void onAddWordTranslation(WordTranslation wordTranslation) {
        Disposable d = model.addWordTranslation(wordTranslation)
                .subscribe(() -> {
                    model.trySyncAllReposWithCache().blockingGet();
                }, Throwable::printStackTrace);

        compositeDisposable.add(d);
    }

    @Override
    public void onItemDismiss(int position) {
        onRemoveWordTranslation(translationMainView.getWordTranslations().get(position));
    }
}
