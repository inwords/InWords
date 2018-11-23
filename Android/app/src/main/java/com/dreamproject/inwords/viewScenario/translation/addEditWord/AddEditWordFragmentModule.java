package com.dreamproject.inwords.viewScenario.translation.addEditWord;


import dagger.Module;
import dagger.android.ContributesAndroidInjector;

@Module(subcomponents = AddEditWordFragmentComponent.class)
public abstract class AddEditWordFragmentModule {
    @ContributesAndroidInjector(modules = { /* modules to install into the subcomponent */})
    abstract AddEditWordFragment contributeYourActivityInjector();
}
