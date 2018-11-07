package com.dreamproject.inwords.data.source.WebService;

import java.util.concurrent.atomic.AtomicInteger;

import javax.inject.Inject;

import io.reactivex.Completable;
import retrofit2.HttpException;

public class SessionHelper {
    private final int MAX_UNAUTHORISED_REQUESTS;
    private AtomicInteger unauthorisedReqThreshold;

    @Inject
    public SessionHelper(/*int maxRequests*/) {
        this.MAX_UNAUTHORISED_REQUESTS = 3;
        this.unauthorisedReqThreshold = new AtomicInteger(0);
    }

    public Completable interceptError(Throwable throwable) {
        if (throwable instanceof HttpException) {
            switch (((HttpException) throwable).code()) {
                case 401: //TODO find the const
                    unauthorisedReqThreshold.getAndIncrement();
                    return requireThreshold();
                default:
                    break;
            }
        }

        return Completable.complete();
    }

    public Completable requireThreshold() {
        return Completable.create(emitter -> {
            if (unauthorisedReqThreshold.get() > MAX_UNAUTHORISED_REQUESTS)
                emitter.onError(new RuntimeException("Threshold reached")); //TODO make normal exception

            emitter.onComplete();
        });
    }

    public Completable resetThreshold() {
        return Completable.fromAction(() -> unauthorisedReqThreshold.set(0));
    }
}
