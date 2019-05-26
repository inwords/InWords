package ru.inwords.inwords.data.repository.game

import android.util.Log
import io.mockk.every
import io.mockk.junit5.MockKExtension
import io.mockk.mockkStatic
import io.reactivex.BackpressureStrategy
import io.reactivex.Single
import io.reactivex.subscribers.TestSubscriber
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import ru.inwords.inwords.data.repository.ResourceCachingProvider
import ru.inwords.inwords.domain.model.Resource

@ExtendWith(MockKExtension::class)
internal class ResourceCachingProviderTest {
    private val localRepo = HashMap<Int, String>()
    private val id = 10

    @Test
    fun resourceCachingProvider_create_all_success() {
        val str = "Remote val"

        val provider = ResourceCachingProvider<String>(
                { data -> Single.fromCallable { localRepo.put(id, data) }.map { data } },
                { Single.just(localRepo[id]) }, //by id local
                { Single.just(str) }) //by id remote

        provider.observe()
                .test()
                .awaitCount(1)
                .assertNoErrors()
                .assertValue { it.success() }
                .assertValue { it.data!! == str }
                .assertValueCount(1)
                .assertNotTerminated()

        assert(localRepo[id] == str)
        assert(localRepo.size == 1)
    }

    @Test
    fun resourceCachingProvider_create_local_insert_error_remote_success() {
        mockkStatic(Log::class)
        every { Log.d(any(), any()) } returns 0

        val str = "Remote val"

        val provider = ResourceCachingProvider<String>(
                { Single.error(Throwable("local error")) },
                { Single.just(localRepo[id]) }, //by id local
                { Single.just(str) }) //by id remote

        provider.observe()
                .test()
                .awaitCount(1)
                .assertNoErrors()
                .assertValue { it.success() }
                .assertValue { it.data!! == str }
                .assertValueCount(1)
                .assertNotTerminated()

        assert(localRepo.size == 0)
    }

    @Test
    fun resourceCachingProvider_askForContentUpdate_all_success() {
        val str = StringBuilder("Remote val")

        val provider = ResourceCachingProvider<String>(
                { data -> Single.fromCallable { localRepo.put(id, data) }.map { data } },
                { Single.just(localRepo[id]) }, //by id local
                { Single.just(str.toString()) }) //by id remote

        val subscriber = TestSubscriber<Resource<String>>()

        provider.observe()
                .toFlowable(BackpressureStrategy.BUFFER)
                .subscribe(subscriber)

        subscriber.awaitCount(1)

        str.append(2)
        provider.askForContentUpdate()

        subscriber
                .awaitCount(3, {}, 50) //TODO
                .assertNoErrors()
                .assertValueAt(1) { it.success() }
                .assertValueAt(1) { it.data!! == str.toString() }
                .assertValueCount(2)
                .assertTimeout()
                .assertNotTerminated()

        assert(localRepo[id] == str.toString())
        assert(localRepo.size == 1)
    }

    @Test
    fun resourceCachingProvider_askForContentUpdate_create_remote_error_local_success() {
        mockkStatic(Log::class)
        every { Log.d(any(), any()) } returns 0

        val str = "Local val"

        val provider = ResourceCachingProvider<String>(
                { data -> Single.fromCallable { localRepo.put(id, data) }.map { data } },
                { Single.just(localRepo[id]) }, //by id local
                { Single.error(Throwable("remote error")) }) //by id remote

        localRepo[id] = str

        provider.observe()
                .test()
                .awaitCount(1)
                .assertNoErrors()
                .assertValue { it.success() }
                .assertValue { it.data!! == str }
                .assertValueCount(1)
                .assertNotTerminated()

        assert(localRepo[id] == str)
        assert(localRepo.size == 1)
    }

    @Test
    fun resourceCachingProvider_askForContentUpdate_create_all_error() {
        mockkStatic(Log::class)
        every { Log.d(any(), any()) } returns 0

        val provider = ResourceCachingProvider<String>(
                { data -> Single.fromCallable { localRepo.put(id, data) }.map { data } },
                { Single.error(Throwable("local error")) }, //by id local
                { Single.error(Throwable("remote error")) }) //by id remote

        provider.observe()
                .test()
                .awaitCount(1)
                .assertNoErrors()
                .assertValue { it.error() }
                .assertValue { it.data == null }
                .assertValueCount(1)
                .assertNotTerminated()

        assert(localRepo.size == 0)
    }
}