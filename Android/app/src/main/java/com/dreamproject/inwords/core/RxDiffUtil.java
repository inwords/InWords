package com.dreamproject.inwords.core;

import android.support.v7.util.DiffUtil;
import android.util.Pair;

import java.util.Collections;
import java.util.List;

import io.reactivex.ObservableTransformer;
import io.reactivex.functions.BiFunction;

public class RxDiffUtil {
    public static <T> ObservableTransformer<List<T>, Pair<List<T>, DiffUtil.DiffResult>>
    calculate(BiFunction<List<T>, List<T>, DiffUtil.Callback> itemDiffer) {
        Pair<List<T>, DiffUtil.DiffResult> seedPair = Pair.create(Collections.emptyList(), null);
        return upstream -> upstream
                .scan(seedPair, (oldPair, nextItems) -> {
                    DiffUtil.Callback callback = itemDiffer.apply(oldPair.first, nextItems);
                    DiffUtil.DiffResult result = DiffUtil.calculateDiff(callback, true);
                    return Pair.create(nextItems, result);
                })
                .skip(1);  // downstream shouldn't receive seedPair.
    }
}
