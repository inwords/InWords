package ru.inwords.inwords.core.property

import android.content.SharedPreferences
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import io.reactivex.Completable
import io.reactivex.Maybe
import io.reactivex.Single
import java.lang.reflect.Type
import java.util.concurrent.locks.ReentrantReadWriteLock
import kotlin.concurrent.read
import kotlin.concurrent.write

class SharedPrefsCache<T : Any>(name: String, preferences: SharedPreferences, private val gson: Gson, private val type: Type) {

    private val property = StringSharedPrefsPropertyWrapper(name, preferences)
    private val lock = ReentrantReadWriteLock()

    fun set(entity: T): Completable {
        return Completable.fromAction {
            lock.write {
                property.write(gson.toJson(entity, type))
            }
        }
    }

    fun get(): Maybe<T> {
        return Maybe.fromCallable { readValueWithLockInternal() }
    }

    fun get(defaultValueProvider: () -> T): Single<T> {
        return Single.fromCallable { getOrDefaultInternal(defaultValueProvider) }
    }

    fun update(defaultValueProvider: () -> T, updater: (T) -> T): Single<T> {
        return Single.fromCallable {
            lock.write {
                val currentValue = getOrDefaultInternal(defaultValueProvider)
                val entity = updater.invoke(currentValue)
                property.write(gson.toJson(entity, type))
                entity
            }
        }
    }

    fun invalidate(): Completable {
        return Completable.fromAction { invalidateWithLockInternal() }
    }

    private fun getOrDefaultInternal(defaultValueProvider: () -> T): T {
        return readValueWithLockInternal() ?: defaultValueProvider.invoke()
    }

    /**
     * not really thread-safe, but for the purpose is ok
     */
    private fun readValueWithLockInternal(): T? {
        return try {
            lock.read {
                property.read()?.let {
                    (gson.fromJson(it, type) as T)
                }
            }
        } catch (error: Throwable) {
            invalidateWithLockInternal()
            null
        }
    }

    private fun invalidateWithLockInternal() {
        lock.write {
            property.write(null)
        }
    }

    companion object {
        inline fun <reified T : Any> create(name: String, preferences: SharedPreferences, gson: Gson): SharedPrefsCache<T> {
            return SharedPrefsCache(name, preferences, gson, object : TypeToken<T>() {}.type)
        }
    }

}