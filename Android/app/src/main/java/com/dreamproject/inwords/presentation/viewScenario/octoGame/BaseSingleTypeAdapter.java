package com.dreamproject.inwords.presentation.viewScenario.octoGame;

import android.util.Pair;
import android.view.LayoutInflater;

import java.util.ArrayList;
import java.util.List;

import androidx.recyclerview.widget.DiffUtil;
import androidx.recyclerview.widget.RecyclerView;
import io.reactivex.functions.Consumer;
import io.reactivex.subjects.PublishSubject;

public abstract class BaseSingleTypeAdapter<T, VH extends RecyclerView.ViewHolder>
        extends RecyclerView.Adapter<VH>
        implements Consumer<Pair<List<T>, DiffUtil.DiffResult>> {
    protected final LayoutInflater inflater;
    protected List<T> values;
    protected PublishSubject<T> onItemClickedListener;

    protected BaseSingleTypeAdapter(List<T> values,
                                    LayoutInflater layoutInflater,
                                    PublishSubject<T> onItemClickedListener) {
        this.inflater = layoutInflater;
        this.values = values;
        this.onItemClickedListener = onItemClickedListener;
    }

    protected BaseSingleTypeAdapter(LayoutInflater layoutInflater,
                                    PublishSubject<T> onItemClickedListener) {
        this(new ArrayList<>(), layoutInflater, onItemClickedListener);
    }

    @Override
    public void accept(Pair<List<T>, DiffUtil.DiffResult> pair) {
        this.values = pair.first;
        pair.second.dispatchUpdatesTo(this);
    }

    public List<T> getValues() {
        return values;
    }

    @Override
    public int getItemCount() {
        return values.size();
    }
}
