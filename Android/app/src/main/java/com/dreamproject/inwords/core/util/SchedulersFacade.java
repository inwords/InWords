package com.dreamproject.inwords.core.util;

import io.reactivex.Scheduler;
import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.annotations.NonNull;
import io.reactivex.schedulers.Schedulers;

/**
 * Provides various threading schedulers.
 */

public class SchedulersFacade {
    /**
     * IO thread pool scheduler
     */
    @NonNull
    static public Scheduler io() {
        return Schedulers.io();
    }

    /**
     * Computation thread pool scheduler
     */
    @NonNull
    static public Scheduler computation() {
        return Schedulers.computation();
    }

    /**
     * Main Thread scheduler
     */
    @NonNull
    static public Scheduler ui() {
        return AndroidSchedulers.mainThread();
    }
}
