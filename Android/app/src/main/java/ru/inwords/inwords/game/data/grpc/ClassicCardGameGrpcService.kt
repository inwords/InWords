package ru.inwords.inwords.game.data.grpc

import dagger.Lazy
import io.grpc.ManagedChannel
import io.reactivex.Single
import ru.inwords.inwords.authorisation.data.session.NativeTokenHolder
import ru.inwords.inwords.core.grpc.HeaderAttachingClientInterceptor
import ru.inwords.inwords.core.utils.unsafeLazy
import ru.inwords.inwords.dagger.annotations.GrpcDefaultChannel
import ru.inwords.inwords.proto.classic_card_game.CardGameInfos
import ru.inwords.inwords.proto.classic_card_game.CardGameMetrics
import ru.inwords.inwords.proto.classic_card_game.ClassicCardGameProviderGrpc
import ru.inwords.inwords.proto.classic_card_game.LevelPoints
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
internal class ClassicCardGameGrpcService @Inject constructor(
    @GrpcDefaultChannel managedChannel: Lazy<ManagedChannel>,
    nativeTokenHolder: NativeTokenHolder
) {
    private val classicCardGameProviderStub: ClassicCardGameProviderGrpc.ClassicCardGameProviderBlockingStub by unsafeLazy {
        ClassicCardGameProviderGrpc.newBlockingStub(managedChannel.get())
            .withInterceptors(HeaderAttachingClientInterceptor(nativeTokenHolder))
    }

    fun estimate(cardGameMetrics: List<CardGameMetrics.CardGameMetric>): Single<LevelPoints> {
        val request = CardGameMetrics.newBuilder()
            .addAllMetrics(cardGameMetrics)
            .build()

        return Single.fromCallable { classicCardGameProviderStub.estimate(request) }
    }

    fun save(cardGameInfos: List<CardGameInfos.CardGameInfo>): Single<LevelPoints> {
        val request = CardGameInfos.newBuilder()
            .addAllInfo(cardGameInfos)
            .build()

        return Single.fromCallable { classicCardGameProviderStub.saveGames(request) }
    }
}