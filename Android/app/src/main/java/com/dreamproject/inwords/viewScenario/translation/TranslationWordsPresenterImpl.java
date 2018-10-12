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
    public void loadData() {
        //model.presyncOnStart(application);

        Disposable d = model.getAllWords()
                .flatMapCompletable(translationMainView::updateWordTranslations)
                .subscribe(() -> {
                }, Throwable::printStackTrace);

        compositeDisposable.add(d);
    }

    @Override
    public void removeWordTranslation(WordTranslation wordTranslation) {
        Disposable d = model.removeWordTranslation(wordTranslation)
                .subscribe(() -> {model.trySyncAllReposWithCache().blockingGet();
                }, Throwable::printStackTrace);

        compositeDisposable.add(d);
    }

    @Override
    public void addWordTranslation(WordTranslation wordTranslation) {
        Disposable d = model.addWordTranslation(wordTranslation)
                .subscribe(() -> {
                }, Throwable::printStackTrace);

        compositeDisposable.add(d);
    }

    @Override
    public void onItemDismiss(int position) {
        removeWordTranslation(translationMainView.getWordTranslations().get(position));
    }
}
