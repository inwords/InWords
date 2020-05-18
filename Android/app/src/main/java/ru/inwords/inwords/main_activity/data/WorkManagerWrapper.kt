package ru.inwords.inwords.main_activity.data

import androidx.work.*
import dagger.Lazy

class WorkManagerWrapper internal constructor(private val workManager: Lazy<WorkManager>) {

    fun enqueue(uniqueWorkName: String, existingWorkPolicy: ExistingWorkPolicy, worker: Class<out ListenableWorker>) {
        val wm = workManager.get()

        val request = OneTimeWorkRequest.Builder(worker)
            .setConstraints(
                Constraints.Builder()
                    .setRequiredNetworkType(NetworkType.CONNECTED)
                    .build()
            )
            .build()

        wm.enqueueUniqueWork(uniqueWorkName, existingWorkPolicy, request)
    }

    inline fun <reified T : ListenableWorker> enqueue(uniqueWorkName: String, existingWorkPolicy: ExistingWorkPolicy = ExistingWorkPolicy.REPLACE) {
        enqueue(uniqueWorkName, existingWorkPolicy, T::class.java)
    }
}