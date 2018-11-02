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

import java.util.ArrayList;
import java.util.List;

import io.reactivex.Completable;
import io.reactivex.Single;
import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.schedulers.Schedulers;
import io.reactivex.subjects.PublishSubject;

public class WordTranslationsAdapter extends RecyclerView.Adapter<WordTranslationsAdapter.WordViewHolder>
        implements WordListOperations {
    private final LayoutInflater inflater;
    private final int actionLayout;
    private List<WordTranslation> wordTranslations;
    private PublishSubject<WordTranslation> onItemClickedListener;

    private WordTranslationsAdapter(List<WordTranslation> wordTranslations, Context context, PublishSubject<WordTranslation> onItemClickedListener) {
        this.inflater = LayoutInflater.from(context);
        this.actionLayout = R.layout.list_item_word;
        this.wordTranslations = wordTranslations;
        this.onItemClickedListener = onItemClickedListener;
    }

    public WordTranslationsAdapter(Context context, PublishSubject<WordTranslation> onItemClickedListener) {
        this(new ArrayList<>(), context, onItemClickedListener);
    }

    private void setWordTranslations(List<WordTranslation> wordTranslations) {
        this.wordTranslations = wordTranslations;
    }

    @Override
    public Completable applyUpdatedWordTranslations(List<WordTranslation> wordTranslations) {
        return Single.fromCallable(() -> {
            WordTranslationsDiffUtilCallback diffUtilCallback = new WordTranslationsDiffUtilCallback(wordTranslations, getWordTranslations());
            return DiffUtil.calculateDiff(diffUtilCallback);
        })
                .subscribeOn(Schedulers.computation())
                .observeOn(AndroidSchedulers.mainThread())
                .doOnSuccess(diffResult -> {
                    synchronized (WordTranslationsAdapter.class) { //TODO care
                        setWordTranslations(wordTranslations);
                        diffResult.dispatchUpdatesTo(this);
                    }
                })
                .ignoreElement();
    }

    @Override
    public List<WordTranslation> getWordTranslations() {
        return wordTranslations;
    }

    @NonNull
    @Override
    public WordViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = inflater.inflate(actionLayout, parent, false);

        return new WordViewHolder(v);
    }

    @Override
    public void onBindViewHolder(@NonNull final WordViewHolder holder, int position) {
        WordTranslation wordTranslation = wordTranslations.get(position);
        holder.bind(wordTranslation, onItemClickedListener);
    }

    @Override
    public int getItemCount() {
        return wordTranslations.size();
    }

    static class WordViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {
        TextView tv_word_native;
        TextView tv_word_foreign;
        PublishSubject<WordTranslation> onItemClickedListener;
        WordTranslation wordTranslation;

        WordViewHolder(View itemView) {
            super(itemView);
            tv_word_native = itemView.findViewById(R.id.tv_word_native);
            tv_word_foreign = itemView.findViewById(R.id.tv_word_foreign);

            itemView.setOnClickListener(this);
        }

        void bind(WordTranslation wordTranslation, PublishSubject<WordTranslation> onItemClickedListener) {
            tv_word_native.setText(wordTranslation.getWordNative());
            tv_word_foreign.setText(wordTranslation.getWordForeign());
            this.wordTranslation = wordTranslation;
            this.onItemClickedListener = onItemClickedListener;
        }

        @Override
        public void onClick(View v) {
            if (onItemClickedListener != null) {
                onItemClickedListener.onNext(wordTranslation);
            }
        }
    }

}
