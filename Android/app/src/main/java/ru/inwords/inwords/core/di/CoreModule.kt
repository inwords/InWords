package ru.inwords.inwords.core.di

import dagger.Module
import dagger.Provides
import ru.inwords.inwords.core.error_handler.ErrorDataToDomainMapper
import ru.inwords.inwords.core.error_handler.ErrorProcessor
import ru.inwords.inwords.core.error_handler.ErrorProcessorImpl
import ru.inwords.inwords.core.managers.ResourceManager

@Module
class CoreModule {
    @Provides
    fun provideErrorHandler(resourceManager: ResourceManager): ErrorProcessor {
        return ErrorProcessorImpl(resourceManager)
    }

    @Provides
    fun provideErrorDataToDomainMapper(): ErrorDataToDomainMapper {
        return ErrorDataToDomainMapper()
    }
}