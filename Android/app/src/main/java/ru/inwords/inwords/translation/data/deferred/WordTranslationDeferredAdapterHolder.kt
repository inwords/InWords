package ru.inwords.inwords.translation.data.deferred

import ru.inwords.inwords.core.deferred_entry_manager.adapter.ResourceDeferredActions

class WordTranslationDeferredAdapterHolder internal constructor(
    private val wordTranslationDeferredAdapterFactory: WordTranslationDeferredAdapterFactory
) : ResourceDeferredActions<WordTranslationValue> by wordTranslationDeferredAdapterFactory.create()
