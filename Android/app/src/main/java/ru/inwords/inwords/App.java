package ru.inwords.inwords;

import android.app.Application;

import androidx.fragment.app.Fragment;

import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.imagepipeline.backends.okhttp3.OkHttpImagePipelineConfigFactory;
import com.facebook.imagepipeline.core.ImagePipelineConfig;

import javax.inject.Inject;

import dagger.android.AndroidInjector;
import dagger.android.DispatchingAndroidInjector;
import dagger.android.support.HasSupportFragmentInjector;
import okhttp3.OkHttpClient;
import ru.inwords.inwords.dagger.AppComponent;
import ru.inwords.inwords.dagger.DaggerAppComponent;

public class App extends Application implements HasSupportFragmentInjector {
    public static AppComponent appComponent;

    @Inject
    OkHttpClient okHttpClient;
    @Inject
    DispatchingAndroidInjector<Fragment> dispatchingActivityInjector;
    @Inject
    AppComponent _appComponent;

    @Override
    public void onCreate() {
        super.onCreate();

        DaggerAppComponent.factory().create(this).inject(this);

        ImagePipelineConfig config = OkHttpImagePipelineConfigFactory
                .newBuilder(this, okHttpClient)
                .build();
        Fresco.initialize(this, config);

        appComponent = _appComponent;
    }

    @Override
    public AndroidInjector<Fragment> supportFragmentInjector() {
        return dispatchingActivityInjector;
    }
}
