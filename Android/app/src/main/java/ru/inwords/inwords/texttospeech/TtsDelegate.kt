package ru.inwords.inwords.texttospeech

import android.util.Log
import io.reactivex.Observable
import io.reactivex.disposables.Disposable
import io.reactivex.disposables.Disposables
import io.reactivex.subjects.PublishSubject
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.game.domain.model.WordModel
import ru.inwords.inwords.texttospeech.data.repository.TtsRepository

class TtsDelegate(private val ttsRepository: TtsRepository) {
    private val ttsSubject = PublishSubject.create<Resource<String>>()
    val ttsStream: Observable<Resource<String>> = ttsSubject

    private var ttsDisposable: Disposable = Disposables.empty()

    fun ttsWordModel(wordModel: WordModel, progressCallback: (Boolean) -> Unit): Disposable {
        ttsDisposable.dispose()

        progressCallback.invoke(true)
        ttsDisposable = ttsRepository.synthesize(wordModel.word)
            .subscribeOn(SchedulersFacade.computation())
            .map { Resource.Success(it.absolutePath) as Resource<String> }
            .onErrorReturn { Resource.Error(it.message, it) }
            .observeOn(SchedulersFacade.ui())
            .doFinally { progressCallback.invoke(false) }
            .subscribe({
                ttsSubject.onNext(it)
            }, {
                Log.e(javaClass.simpleName, it.message.orEmpty())
            })

        return ttsDisposable
    }
}