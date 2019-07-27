package ru.inwords.inwords.core;

import io.reactivex.Observable;
import io.reactivex.ObservableSource;
import io.reactivex.ObservableTransformer;
import io.reactivex.Observer;
import io.reactivex.disposables.Disposable;
import io.reactivex.internal.disposables.DisposableHelper;
import io.reactivex.internal.fuseable.SimplePlainQueue;
import io.reactivex.internal.queue.SpscLinkedArrayQueue;
import io.reactivex.internal.util.AtomicThrowable;
import io.reactivex.plugins.RxJavaPlugins;

import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicReference;

/**
 * Allows stopping and resuming the flow of the main source when a secondary flow
 * signals false and true respectively.
 *
 * @param <T> the main source's value type
 *
 * @since 0.20.2
 */
final class ObservableValve<T> extends Observable<T> implements ObservableTransformer<T, T> {

    final Observable<? extends T> source;

    final ObservableSource<Boolean> other;

    final boolean defaultOpen;

    final int bufferSize;

    ObservableValve(Observable<? extends T> source, ObservableSource<Boolean> other, boolean defaultOpen, int bufferSize) {
        this.source = source;
        this.other = other;
        this.defaultOpen = defaultOpen;
        this.bufferSize = bufferSize;
    }

    @Override
    protected void subscribeActual(Observer<? super T> observer) {
        ValveMainObserver<T> parent = new ValveMainObserver<>(observer, bufferSize, defaultOpen);
        observer.onSubscribe(parent);
        other.subscribe(parent.other);
        source.subscribe(parent);
    }

    @Override
    public Observable<T> apply(Observable<T> upstream) {
        return new ObservableValve<>(upstream, other, defaultOpen, bufferSize);
    }

    static final class ValveMainObserver<T>
            extends AtomicInteger
            implements Observer<T>, Disposable {

        private static final long serialVersionUID = -2233734924340471378L;

        final Observer<? super T> downstream;

        final AtomicReference<Disposable> upstream;

        final SimplePlainQueue<T> queue;

        final OtherSubscriber other;

        final AtomicThrowable error;

        volatile boolean done;

        volatile boolean gate;

        volatile boolean cancelled;

        ValveMainObserver(Observer<? super T> downstream, int bufferSize, boolean defaultOpen) {
            this.downstream = downstream;
            this.queue = new SpscLinkedArrayQueue<>(bufferSize);
            this.gate = defaultOpen;
            this.other = new OtherSubscriber();
            this.error = new AtomicThrowable();
            this.upstream = new AtomicReference<>();
        }

        @Override
        public void onSubscribe(Disposable d) {
            DisposableHelper.setOnce(upstream, d);
        }

        @Override
        public void onNext(T t) {
            queue.offer(t);
            drain();
        }

        @Override
        public void onError(Throwable t) {
            if (error.addThrowable(t)) {
                drain();
            } else {
                RxJavaPlugins.onError(t);
            }
        }

        @Override
        public void onComplete() {
            done = true;
            drain();
        }

        @Override
        public boolean isDisposed() {
            return cancelled;
        }

        @Override
        public void dispose() {
            cancelled = true;
            DisposableHelper.dispose(upstream);
            DisposableHelper.dispose(other);
        }

        void drain() {
            if (getAndIncrement() != 0) {
                return;
            }

            int missed = 1;

            SimplePlainQueue<T> q = queue;
            Observer<? super T> a = downstream;
            AtomicThrowable error = this.error;

            for (;;) {
                for (;;) {
                    if (cancelled) {
                        q.clear();
                        return;
                    }

                    if (error.get() != null) {
                        Throwable ex = error.terminate();
                        q.clear();
                        DisposableHelper.dispose(upstream);
                        DisposableHelper.dispose(other);
                        a.onError(ex);
                        return;
                    }

                    if (!gate) {
                        break;
                    }

                    boolean d = done;
                    T v = q.poll();
                    boolean empty = v == null;

                    if (d && empty) {
                        DisposableHelper.dispose(other);
                        a.onComplete();
                        return;
                    }

                    if (empty) {
                        break;
                    }

                    a.onNext(v);
                }

                missed = addAndGet(-missed);
                if (missed == 0) {
                    break;
                }
            }
        }

        void change(boolean state) {
            gate = state;
            if (state) {
                drain();
            }
        }

        void innerError(Throwable ex) {
            onError(ex);
        }

        void innerComplete() {
            innerError(new IllegalStateException("The valve source completed unexpectedly."));
        }

        final class OtherSubscriber extends AtomicReference<Disposable> implements Observer<Boolean> {

            private static final long serialVersionUID = -3076915855750118155L;

            @Override
            public void onSubscribe(Disposable d) {
                DisposableHelper.setOnce(this, d);
            }

            @Override
            public void onNext(Boolean t) {
                change(t);
            }

            @Override
            public void onError(Throwable t) {
                innerError(t);
            }

            @Override
            public void onComplete() {
                innerComplete();
            }
        }
    }
}
