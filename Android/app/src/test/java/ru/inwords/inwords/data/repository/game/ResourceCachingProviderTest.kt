package ru.inwords.inwords.data.repository.game

import android.util.Log
import io.mockk.every
import io.mockk.junit5.MockKExtension
import io.mockk.mockkStatic
import io.reactivex.BackpressureStrategy
import io.reactivex.Single
import io.reactivex.subjects.PublishSubject
import io.reactivex.subscribers.TestSubscriber
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import ru.inwords.inwords.core.Resource
import ru.inwords.inwords.core.util.SchedulersFacade
import ru.inwords.inwords.data.repository.ResourceCachingProvider

@ExtendWith(MockKExtension::class)
internal class ResourceCachingProviderTest {
    private val localRepo = HashMap<Int, String>()
    private val id = 10

    @Test
    fun resourceCachingProvider_create_all_success1() {
        val str = StringBuilder("Remote val")
        val i = IntArray(1) { 0 }
        val provider = ResourceCachingProvider<String>(
                { data ->
                    println("db insert $data")
                    Single.fromCallable {
                        localRepo[id] = data
                        println("db inserted $data")
                        Thread.sleep(200)
                    }.map { data }
                },
                {
                    println("db get")
                    Single.fromCallable {
                        Thread.sleep(200)
                        println("db got + ${localRepo[id]}")
                        localRepo[id]
                    }
                }, //by id local
                {
                    str.append(1)
                    val s = str.toString()
                    println("remote get $s")
                    i[0]++
                    Single.create {
                        try {
                            Thread.sleep(1000)
                            println("remote got $s")
                            it.onSuccess(s)
                        } catch (ex: InterruptedException) {
                            println("interrupted $s")
                            if (!it.isDisposed) {
                                it.onError(ex)
                            }
                        }
                    }
                }) //by id remote

        val subscriber = TestSubscriber<Resource<String>>()
        val subject = PublishSubject.create<Resource<String>>()
        subject.subscribe { println("value $it") }
        subject.toFlowable(BackpressureStrategy.MISSING)
                .subscribe(subscriber)

        Thread.sleep(50)
        println("1")
        provider.observe(true)
                .observeOn(SchedulersFacade.io())
                .subscribe { subject.onNext(it) }

        Thread.sleep(50)
//        subscriber.awaitCount(1, {}, 100)
//                .assertTimeout()
//                .assertValueCount(0)

//        provider.invalidateContent()

        println("2")
        provider.observe()
                .observeOn(SchedulersFacade.io())
                .subscribe { subject.onNext(it) }

        Thread.sleep(50)
        println("3")

        provider.observe()
                .observeOn(SchedulersFacade.io())
                .subscribe { subject.onNext(it) }

        Thread.sleep(50)
        println("4")
        provider.observe()
                .observeOn(SchedulersFacade.io())
                .subscribe { subject.onNext(it) }

        val strr = "Remote val" + 11

        subscriber.awaitCount(4)
                .assertNoErrors()
                .assertValueCount(4)
                .assertValueSet(setOf(Resource.Success(strr), Resource.Success(strr), Resource.Success(strr), Resource.Success(strr)))
                .assertNotTerminated()

        assert(i[0] == 2)
        assert(localRepo.size == 1)
    }

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
                .assertValue { it is Resource.Success }
                .assertValue { (it as Resource.Success).data == str }
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
                .assertValue { it is Resource.Success }
                .assertValue { (it as Resource.Success).data == str }
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
                .assertValueAt(1) { it is Resource.Success }
                .assertValueAt(1) { (it as Resource.Success).data == str.toString() }
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
        every { Log.e(any(), any()) } returns 0

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
                .assertValue { it is Resource.Success }
                .assertValue { (it as Resource.Success).data == str }
                .assertValueCount(1)
                .assertNotTerminated()

        assert(localRepo[id] == str)
        assert(localRepo.size == 1)
    }

    @Test
    fun resourceCachingProvider_askForContentUpdate_create_all_error() {
        mockkStatic(Log::class)
        every { Log.d(any(), any()) } returns 0
        every { Log.e(any(), any()) } returns 0

        val provider = ResourceCachingProvider<String>(
                { data -> Single.fromCallable { localRepo.put(id, data) }.map { data } },
                { Single.error(Throwable("local error")) }, //by id local
                { Single.error(Throwable("remote error")) }) //by id remote

        provider.observe()
                .test()
                .awaitCount(1)
                .assertNoErrors()
                .assertValue { it is Resource.Error }
                .assertValueCount(1)
                .assertNotTerminated()

        assert(localRepo.size == 0)
    }
}