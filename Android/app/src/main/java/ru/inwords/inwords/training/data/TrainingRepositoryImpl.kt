package ru.inwords.inwords.training.data

import ru.inwords.inwords.data.source.remote.WebRequestsManagerAuthorised

class TrainingRepositoryImpl(private val webRequestsManagerAuthorised: WebRequestsManagerAuthorised) : TrainingRepository {

    override fun getWordsForTraining() = webRequestsManagerAuthorised.getWordsForTraining()

    override fun getIdsForTraining() = webRequestsManagerAuthorised.getIdsForTraining()
}