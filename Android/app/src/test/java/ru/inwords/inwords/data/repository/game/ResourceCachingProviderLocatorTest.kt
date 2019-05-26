package ru.inwords.inwords.data.repository.game

import io.reactivex.Single
import org.junit.jupiter.api.Test
import ru.inwords.inwords.data.repository.ResourceCachingProvider

internal class ResourceCachingProviderLocatorTest {
    private val localRepo = HashMap<Int, String>()
    private val str = "remote data"

    private val usedIds: MutableList<Int> = ArrayList()

    @Test
    fun resourceCachingProviderLocator_locator() {
        val locator = ResourceCachingProvider.Locator { createGameCachingProvider(it) }

        locator.get(11)
        locator.get(1010)
        locator.get(10)
        locator.get(10)
        locator.get(10)
        locator.get(1010)
        locator.get(10)

        assert(usedIds.containsAll(listOf(10, 11, 1010)))
        assert(HashSet(usedIds).size == usedIds.size)
    }

    private fun createGameCachingProvider(id: Int): ResourceCachingProvider<String> {
        usedIds.add(id)

        return ResourceCachingProvider<String>(
                { data -> Single.fromCallable { localRepo.put(id, data) }.map { data } },
                { Single.just(localRepo[id]) }, //by id local
                { Single.just(str + id) }) //by id remote
    }
}