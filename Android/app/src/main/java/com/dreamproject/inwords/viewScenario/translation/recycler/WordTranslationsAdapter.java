package com.dreamproject.inwords.viewScenario.translation.recycler;

import android.content.Context;
import android.support.annotation.NonNull;
import android.support.v7.util.DiffUtil;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.dreamproject.inwords.R;
import com.dreamproject.inwords.data.entity.WordTranslation;

import java.util.Collections;
import java.util.List;

import io.reactivex.Completable;
import io.reactivex.Single;
import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.schedulers.Schedulers;

public class WordTranslationsAdapter extends RecyclerView.Adapter<WordTranslationsAdapter.TaskViewHolder>
        implements ItemTouchHelperEvents, WordListOperations {
    // Tag used for debugging/logging
    public static final String TAG = "WordTranslationsAdapter";

    private final LayoutInflater inflater;
    private final int actionLayout;
    private List<WordTranslation> wordTranslations;

    public WordTranslationsAdapter(List<WordTranslation> wordTranslations, Context context) {
        this.inflater = LayoutInflater.from(context);
        this.actionLayout = R.layout.list_item_word;
        this.wordTranslations = wordTranslations;
    }

    public WordTranslationsAdapter(Context context) {
        this(Collections.emptyList(), context);
    }

    public void setWordTranslations(List<WordTranslation> wordTranslations) {
        this.wordTranslations = wordTranslations;
    }

    @Override
    public Completable updateWordTranslations(List<WordTranslation> wordTranslations) {
        return Single.fromCallable(() -> {
            WordTranslationsDiffUtilCallback diffUtilCallback = new WordTranslationsDiffUtilCallback(getWordTranslations(), wordTranslations);
            setWordTranslations(wordTranslations);
            return DiffUtil.calculateDiff(diffUtilCallback);
        })
                .subscribeOn(Schedulers.computation())
                .observeOn(AndroidSchedulers.mainThread())
                .doOnSuccess(diffResult -> diffResult.dispatchUpdatesTo(this))
                .ignoreElement();
    }

    @Override
    public List<WordTranslation> getWordTranslations() {
        return wordTranslations;
    }

    @NonNull
    @Override
    public TaskViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = inflater.inflate(actionLayout, parent, false);

        return new TaskViewHolder(v);
    }

    @Override
    public void onBindViewHolder(@NonNull final TaskViewHolder holder, int position) {
        WordTranslation wordTranslation = wordTranslations.get(position);
        holder.tv_word_native.setText(wordTranslation.getWordNative());
        holder.tv_word_foreign.setText(wordTranslation.getWordForeign());
    }

    @Override
    public int getItemCount() {
        return wordTranslations.size();
    }

    @Override
    public void onItemMove(int fromPosition, int toPosition) {
        /*Collections.swap(wordTranslations, fromPosition, toPosition);
        notifyItemMoved(fromPosition, toPosition);*/
    }

    @Override
    public void onItemDismiss(int position) {
        wordTranslations.remove(position);
        notifyItemRemoved(position);
    }

    public static class TaskViewHolder extends RecyclerView.ViewHolder {
        TextView tv_word_native;
        TextView tv_word_foreign;

        TaskViewHolder(View itemView) {
            super(itemView);
            tv_word_native = itemView.findViewById(R.id.tv_word_native);
            tv_word_foreign = itemView.findViewById(R.id.tv_word_foreign);
        }
    }

}
