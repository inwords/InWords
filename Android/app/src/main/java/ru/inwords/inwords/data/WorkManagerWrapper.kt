package ru.inwords.inwords.data

import androidx.work.*
import dagger.Lazy
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class WorkManagerWrapper @Inject internal constructor(private val workManagerWrapper: Lazy<WorkManager>) {

    fun enqueue(uniqueWorkName: String, existingWorkPolicy: ExistingWorkPolicy, worker: Class<out ListenableWorker>) {
        val wm = workManagerWrapper.get()

        val request = OneTimeWorkRequest.Builder(worker)
            .setConstraints(
                Constraints.Builder()
                    .setRequiredNetworkType(NetworkType.METERED)
                    .build()
            )
            .build()

        wm.enqueueUniqueWork(uniqueWorkName, existingWorkPolicy, request)
    }

    inline fun <reified T : ListenableWorker> enqueue(uniqueWorkName: String, existingWorkPolicy: ExistingWorkPolicy = ExistingWorkPolicy.REPLACE) {
        enqueue(uniqueWorkName, existingWorkPolicy, T::class.java)
    }
}