package ru.inwords.inwords.presentation.viewScenario.translation.translationMain;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import java.util.List;
import java.util.concurrent.TimeUnit;

import io.reactivex.Observable;
import ru.inwords.inwords.core.util.Event;
import ru.inwords.inwords.data.dto.WordTranslation;
import ru.inwords.inwords.domain.interactor.translation.TranslationSyncInteractor;
import ru.inwords.inwords.domain.interactor.translation.TranslationWordsInteractor;
import ru.inwords.inwords.presentation.viewScenario.BasicViewModel;

public class TranslationMainViewModel extends BasicViewModel {
    private final MutableLiveData<Event<WordTranslation>> addEditWordLiveData;

    private final TranslationWordsInteractor translationWordsInteractor;
    private TranslationSyncInteractor translationSyncInteractor;

    public TranslationMainViewModel(final TranslationWordsInteractor translationWordsInteractor,
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