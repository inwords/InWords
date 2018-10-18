package com.dreamproject.inwords.viewScenario.translation;

import android.app.Application;

import com.dreamproject.inwords.BasicModelPresenter;
import com.dreamproject.inwords.data.entity.WordTranslation;
import com.dreamproject.inwords.model.DependenciesComponent;
import com.dreamproject.inwords.model.MainModel;
import com.dreamproject.inwords.viewScenario.translation.recycler.ItemTouchHelperEvents;

import io.reactivex.disposables.Disposable;

public class TranslationWordsPresenterImpl extends BasicModelPresenter<MainModel> implements
        TranslationWordsPresenter,
        ItemTouchHelperEvents {

    private TranslationMainView translationMainView;

    TranslationWordsPresenterImpl(Application application, TranslationMainView translationMainView) {
        super(DependenciesComponent.getMainModelInstance(application));

        this.translationMainView = translationMainView;
    }

    @Override
    public void onViewCreated() {
        Disposable d = model.getAllWords()
                .concatMapCompletable(translationMainView::updateWordTranslations)
                .subscribe(() -> {
                }, Throwable::printStackTrace);

        compositeDisposable.add(d);
    }

    @Override
    public void onRemoveWordTranslation(WordTranslation wordTranslation) {
        Disposable d = model.removeWordTranslation(wordTranslation)
                .subscribe(() -> model.notifyDataChanged(), Throwable::printStackTrace);

        compositeDisposable.add(d);
    }

    @Override
    public void onAddWordTranslation(WordTranslation wordTranslation) {
        Disposable d = model.addWordTranslation(wordTranslation)
                .subscribe(() -> model.notifyDataChanged(), Throwable::printStackTrace);

        compositeDisposable.add(d);
    }

    @Override
    public void onItemDismiss(int position) {
        onRemoveWordTranslation(translationMainView.getWordTranslations().get(position));
    }
}
