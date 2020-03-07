package ru.inwords.inwords

import android.app.Application
import android.net.TrafficStats
import android.os.Build
import android.os.StrictMode
import android.os.StrictMode.ThreadPolicy
import android.os.StrictMode.VmPolicy
import android.util.Log
import androidx.work.Configuration
import com.facebook.drawee.backends.pipeline.Fresco
import com.facebook.imagepipeline.backends.okhttp3.OkHttpImagePipelineConfigFactory
import dagger.android.AndroidInjector
import dagger.android.DispatchingAndroidInjector
import dagger.android.HasAndroidInjector
import io.reactivex.exceptions.UndeliverableException
import io.reactivex.plugins.RxJavaPlugins
import okhttp3.OkHttpClient
import ru.inwords.inwords.dagger.AppComponent
import ru.inwords.inwords.dagger.DaggerAppComponent
import ru.inwords.inwords.dagger.annotations.UnauthorisedZone
import javax.inject.Inject


class App : Application(), HasAndroidInjector, Configuration.Provider {
    companion object {
        lateinit var appComponent: AppComponent
    }

    @Inject
    @field:UnauthorisedZone
    internal lateinit var okHttpClient: OkHttpClient

    @Inject
    internal lateinit var dispatchingAndroidInjector: DispatchingAndroidInjector<Any>

    @Inject
    internal lateinit var appComponentInternal: AppComponent

    override fun onCreate() {
        super.onCreate()

        DaggerAppComponent.factory().create(this).inject(this)

        val config = OkHttpImagePipelineConfigFactory
                .newBuilder(this, okHttpClient)
                .build()
        Fresco.initialize(this, config) //violates strictmode policy

        addStrictModeIfDebug()

        appComponent = appComponentInternal

        RxJavaPlugins.setErrorHandler { e ->
            if (e is UndeliverableException) {
                Log.wtf("App", e.message.orEmpty())
            } else {
                Thread.currentThread().also { thread ->
                    thread.uncaughtExceptionHandler?.uncaughtException(thread, e)
                }
            }
        }
    }

    override fun getWorkManagerConfiguration() =
        Configuration.Builder()
            .setMinimumLoggingLevel(if (BuildConfig.DEBUG) Log.INFO else Log.ERROR)
            .build()

    override fun androidInjector(): AndroidInjector<Any> {
        return dispatchingAndroidInjector
    }

    //region Strict Mode Activation
    private fun addStrictModeIfDebug() {
        if (BuildConfig.DEBUG) {
            enableStrictModeThreadPolicy(false)
            /*
              Пояснение:

              "turnOffUntaggedSocketDetection = true" исключает проверку приложения на "Untagged Socket Detected"
              В своем коде мы эту проблему устранили простановкой тэга статистики в нужных местах (TrafficStats#setThreadStatsTag(int))
              Остались проблемы сыпящиеся в большом количестве из сторонних библиотек (различные либы аналитики, Picasso)
              Данные ошибки засоряют нам лог и мешают определять другие проблемы выявляемые StrictMode.VmPolicy
              Когда (если) "Untagged Socket Detected" будет поправлен в OkHttp и тех библиотеках, из которых прилетает данная ошибка,
              можно будет вернуть проверку "Untagged Socket Detected"

              Условное отключение сделано для возможности периодически все-таки анализировать работу приложения,
              вдруг в нашем коде снова где-то начнет стрелять данная проблема

              Bug report OkHttp: https://github.com/square/okhttp/issues/3537
            */
            enableStrictModeVmPolicy(true)
        }
    }

    /**
     * Активирует [ThreadPolicy] политику [StrictMode] для приложения
     *
     *
     *  * Перечень нарушений: Все нарушения
     *  * Реакция: Вывод в лог + Мигание экрана, если передан flashPenalty флаг
     *
     *
     * @param flashPenalty true: при выявлении нарушений экран приложения будет мигать
     */
    private fun enableStrictModeThreadPolicy(flashPenalty: Boolean) {
        val builder = ThreadPolicy.Builder()
                .detectAll()
                .penaltyLog()

        if (flashPenalty) {
            builder.penaltyFlashScreen()
        }

        StrictMode.setThreadPolicy(builder.build())
    }

    /**
     * Активирует [VmPolicy] политику [StrictMode] для приложения
     *
     *  * Перечень нарушений: Все нарушения (за исключением "Untagged Socket Detected") если передан turnOffUntaggedSocketDetection = true
     *  * Реакция: Вывод в лог
     *
     *
     * @param turnOffUntaggedSocketDetection true - откючает отслеживание ошибки с Untagged Socket Detected
     * @see .createStrictModeVmPolicyWithoutUntaggedSocketCheck
     * @see TrafficStats.setThreadStatsTag
     */
    private fun enableStrictModeVmPolicy(turnOffUntaggedSocketDetection: Boolean) {
        val builder = if (turnOffUntaggedSocketDetection) {
            createStrictModeVmPolicyWithoutUntaggedSocketCheck()
        } else {
            VmPolicy.Builder().detectAll()
        }
        val policy = builder
                .penaltyLog()
                .build()
        StrictMode.setVmPolicy(policy)
    }

    /**
     * Возвращает VmPolicy.Builder с отключенной проверкой "Untagged Socket Detection"
     *
     * <h3>Зачем это надо?</h3>
     *
     *
     * Сейчас есть [проблема](https://github.com/square/okhttp/issues/3537) на стороне OkHttp<br></br>
     * В ситациях, когда мы не имеем доступа к исходному коду (сторонние библиотеки вроде Crashlytics, Picasso) не можем поправить по нормальному.
     *
     *
     *
     * Поэтому надо иметь возможность отключить эту проверку,<br></br>
     * чтобы сообщения от сторонних библиотек не мешали анализировать другие проблемы выявляемые StrictMode.VmPolicy
     *
     *
     * <h3>Почему отключается именно так?</h3>
     *
     *
     * На targetSdk = 28 проверка нормально отключаться не хочет (на targetSdk < 28 можно было вызвать permitUntaggedSockets).<br></br>
     * Приходится пока копировать все содержимое [VmPolicy.Builder.detectAll] и удалять там detectUntaggedSockets()
     *
     *
     * @return VmPolicy.Builder без включенной проверки "detectUntaggedSockets"
     */
    private fun createStrictModeVmPolicyWithoutUntaggedSocketCheck(): VmPolicy.Builder {
        val builder = VmPolicy.Builder()
                .detectLeakedSqlLiteObjects()
                .detectActivityLeaks()
                .detectLeakedClosableObjects()
                .detectLeakedRegistrationObjects()

        builder.detectFileUriExposure()

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            builder.detectContentUriWithoutPermission()
        }

        return builder
    }
    //end region Strict Mode Activation
}
