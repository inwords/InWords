package ru.inwords.inwords.texttospeech

import android.media.AudioAttributes
import android.media.MediaPlayer
import android.util.Log
import io.reactivex.Observable
import io.reactivex.disposables.Disposable
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.core.rxjava.SchedulersFacade

class TtsMediaPlayerAdapter(private val resultCallback: (Resource<String>) -> Unit) {
    private val attrs = AudioAttributes.Builder().setContentType(AudioAttributes.CONTENT_TYPE_SPEECH).build()

    private val mediaPlayer = MediaPlayer()

    fun observeTtsStream(ttsStream: Observable<Resource<String>>): Disposable {
        return ttsStream.doOnNext {
            if (it is Resource.Success) {
                playAudio(it.data)
            }
        }
            .observeOn(SchedulersFacade.ui())
            .subscribe { resultCallback(it) }
    }

    private fun playAudio(path: String) {
        try {
            mediaPlayer.reset()
            mediaPlayer.setDataSource(path)
            mediaPlayer.setAudioAttributes(attrs)
            mediaPlayer.prepare()
            mediaPlayer.start()
        } catch (throwable: Throwable) {
            Log.e(javaClass.simpleName, throwable.message.orEmpty())
        }
    }

    fun destroy(){
        mediaPlayer.stop()
        mediaPlayer.release()
    }
}