package ru.inwords.inwords.core.resource

import io.reactivex.Completable
import io.reactivex.Single
import org.junit.jupiter.api.Test

internal class ResourceCachingProviderWithFinalValueTest {
    private class Ref(var value: Int)

    @Test
    fun `given all success should remote, insert, final when first observed`() {
        val ref = Ref(0)
        val cachingProvider = ResourceCachingProviderWithFinalValue(
            databaseInserter = {
                Completable.fromAction { ref.value += 21 }
            },
            finalValueProvider = {
                Single.fromCallable {
                    ref.value += 10
                    ref.value
                }
            },
            remoteDataProvider = {
                Single.fromCallable {
                    ref.value += 1
                    ref.value
                }
            }
        )

        cachingProvider.observe()
            .test()
            .awaitCount(1)
            .assertNoErrors()
            .assertValue { it is Resource.Success }
            .assertValue { (it as Resource.Success).data == 32 }
            .assertValue { (it as Resource.Success).source == Source.NETWORK }
            .assertValueCount(1)
            .assertNotTerminated()
    }

    @Test
    fun `given all success should final, remote, insert, final when first observed with prefetch`() {
        val ref = Ref(0)
        val cachingProvider = ResourceCachingProviderWithFinalValue(
            databaseInserter = {
                Completable.fromAction { ref.value += 21 }
            },
            finalValueProvider = {
                Single.fromCallable {
                    ref.value += 10
                    ref.value
                }
            },
            remoteDataProvider = {
                Single.fromCallable {
                    ref.value += 1
                    ref.value
                }
            },
            prefetchFinalValue = true
        )

        cachingProvider.observe()
            .test()
            .awaitCount(2)
            .assertNoErrors()
            .assertValueAt(0) { it is Resource.Success }
            .assertValueAt(0) { (it as Resource.Success).data == 10 }
            .assertValueAt(0) { (it as Resource.Success).source == Source.PREFETCH }
            .assertValueAt(1) { it is Resource.Success }
            .assertValueAt(1) { (it as Resource.Success).data == 42 }
            .assertValueAt(1) { (it as Resource.Success).source == Source.NETWORK }
            .assertValueCount(2)
            .assertNotTerminated()
    }

    @Test
    fun `given remote error should final when first observed`() {
        val ref = Ref(0)
        val cachingProvider = ResourceCachingProviderWithFinalValue(
            databaseInserter = {
                Completable.fromAction { ref.value += 21 }
            },
            finalValueProvider = {
                Single.fromCallable {
                    ref.value += 10
                    ref.value
                }
            },
            remoteDataProvider = {
                Single.fromCallable {
                    ref.value += 1
                    ref.value
                    throw Throwable()
                }
            }
        )

        cachingProvider.observe()
            .test()
            .awaitCount(1)
            .assertNoErrors()
            .assertValue { it is Resource.Success }
            .assertValue { (it as Resource.Success).data == 11 }
            .assertValue { (it as Resource.Success).source == Source.CACHE }
            .assertValueCount(1)
            .assertNotTerminated()
    }
}