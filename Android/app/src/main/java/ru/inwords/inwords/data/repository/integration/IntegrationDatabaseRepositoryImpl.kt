package ru.inwords.inwords.data.repository.integration

import android.content.SharedPreferences
import androidx.core.content.edit
import io.reactivex.Completable
import io.reactivex.Single
import ru.inwords.inwords.data.source.database.AppRoomDatabase
import javax.inject.Inject

class IntegrationDatabaseRepositoryImpl @Inject internal constructor(private val database: AppRoomDatabase,
                                                                     private val sharedPreferences: SharedPreferences) : IntegrationDatabaseRepository {

    override fun getPolicyAgreementState(): Single<Boolean> {
        return Single.fromCallable {
            sharedPreferences.getBoolean(POLICY_PRIVACY_KEY, false)
        }
    }

    override fun setPolicyAgreementState(state: Boolean): Completable {
        return Completable.fromAction {
            sharedPreferences.edit(true) {
                putBoolean(POLICY_PRIVACY_KEY, state)
            }
        }
    }

    override fun clearAllTables(): Completable {
        return Completable.fromAction { database.clearAllTables() }
    }
}

const val POLICY_PRIVACY_KEY = "policy_privacy_accepted"