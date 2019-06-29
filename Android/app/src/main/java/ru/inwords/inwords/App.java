package ru.inwords.inwords;

import android.app.Application;
import android.net.TrafficStats;
import android.os.Build;
import android.os.StrictMode;
import android.os.StrictMode.ThreadPolicy;
import android.os.StrictMode.VmPolicy;

import androidx.annotation.NonNull;

import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.imagepipeline.backends.okhttp3.OkHttpImagePipelineConfigFactory;
import com.facebook.imagepipeline.core.ImagePipelineConfig;

import javax.inject.Inject;

import dagger.android.AndroidInjector;
import dagger.android.DispatchingAndroidInjector;
import dagger.android.HasAndroidInjector;
import okhttp3.OkHttpClient;
import ru.inwords.inwords.dagger.AppComponent;
import ru.inwords.inwords.dagger.DaggerAppComponent;

public class App extends Application implements HasAndroidInjector {
    public static AppComponent appComponent;

    @Inject
    OkHttpClient okHttpClient;

    @Inject
    DispatchingAndroidInjector<Object> dispatchingAndroidInjector;

    @Inject
    AppComponent _appComponent;

    @Override
    public void onCreate() {
        super.onCreate();

        DaggerAppComponent.factory().create(this).inject(this);

        ImagePipelineConfig config = OkHttpImagePipelineConfigFactory
                .newBuilder(this, okHttpClient)
                .build();
        Fresco.initialize(this, config); //violates strictmode policy

        addStrictModeIfDebug();

        appComponent = _appComponent;
    }

    @Override
    public AndroidInjector<Object> androidInjector() {
        return dispatchingAndroidInjector;
    }

    //region Strict Mode Activation
    private void addStrictModeIfDebug() {
        if (BuildConfig.DEBUG) {
            enableStrictModeThreadPolicy(false);
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
            enableStrictModeVmPolicy(true);
        }
    }

    /**
     * Активирует {@link ThreadPolicy} политику {@link StrictMode} для приложения
     *
     * <ul>
     * <li>Перечень нарушений: Все нарушения</li>
     * <li>Реакция: Вывод в лог + Мигание экрана, если передан flashPenalty флаг</li>
     * </ul>
     *
     * @param flashPenalty true: при выявлении нарушений экран приложения будет мигать
     */
    private void enableStrictModeThreadPolicy(boolean flashPenalty) {
        ThreadPolicy.Builder builder =
                new ThreadPolicy.Builder()
                        .detectAll()
                        .penaltyLog();

        if (flashPenalty) {
            builder.penaltyFlashScreen();
        }

        StrictMode.setThreadPolicy(builder.build());
    }

    /**
     * Активирует {@link VmPolicy} политику {@link StrictMode} для приложения
     * <ul>
     * <li>Перечень нарушений: Все нарушения (за исключением "Untagged Socket Detected") если передан turnOffUntaggedSocketDetection = true</li>
     * <li>Реакция: Вывод в лог</li>
     * </ul>
     *
     * @param turnOffUntaggedSocketDetection true - откючает отслеживание ошибки с Untagged Socket Detected
     * @see #createStrictModeVmPolicyWithoutUntaggedSocketCheck()
     * @see TrafficStats#setThreadStatsTag(int)
     */
    private void enableStrictModeVmPolicy(boolean turnOffUntaggedSocketDetection) {
        VmPolicy.Builder builder =
                turnOffUntaggedSocketDetection ? createStrictModeVmPolicyWithoutUntaggedSocketCheck()
                        : new VmPolicy.Builder().detectAll();
        VmPolicy policy = builder
                .penaltyLog()
                .build();
        StrictMode.setVmPolicy(policy);
    }

    /**
     * Возвращает VmPolicy.Builder с отключенной проверкой "Untagged Socket Detection"
     *
     * <h3>Зачем это надо?</h3>
     * <p>
     * Сейчас есть <a href="https://github.com/square/okhttp/issues/3537">проблема</a> на стороне OkHttp<br/>
     * В ситациях, когда мы не имеем доступа к исходному коду (сторонние библиотеки вроде Crashlytics, Picasso) не можем поправить по нормальному.
     * </p>
     * <p>
     * Поэтому надо иметь возможность отключить эту проверку,<br/>
     * чтобы сообщения от сторонних библиотек не мешали анализировать другие проблемы выявляемые StrictMode.VmPolicy
     * </p>
     *
     * <h3>Почему отключается именно так?</h3>
     * <p>
     * На targetSdk = 28 проверка нормально отключаться не хочет (на targetSdk < 28 можно было вызвать permitUntaggedSockets).<br/>
     * Приходится пока копировать все содержимое {@link VmPolicy.Builder#detectAll()} и удалять там detectUntaggedSockets()
     * </p>
     *
     * @return VmPolicy.Builder без включенной проверки "detectUntaggedSockets"
     */
    @NonNull
    private VmPolicy.Builder createStrictModeVmPolicyWithoutUntaggedSocketCheck() {
        VmPolicy.Builder builder = new VmPolicy.Builder()
                .detectLeakedSqlLiteObjects()
                .detectActivityLeaks()
                .detectLeakedClosableObjects()
                .detectLeakedRegistrationObjects();

        final int targetSdk = Build.VERSION.SDK_INT;

        builder.detectFileUriExposure();

        if (targetSdk >= Build.VERSION_CODES.O) {
            builder.detectContentUriWithoutPermission();
        }

        return builder;
    }
}
