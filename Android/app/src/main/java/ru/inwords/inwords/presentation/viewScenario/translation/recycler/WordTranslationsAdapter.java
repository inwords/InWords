package ru.inwords.inwords.presentation.viewScenario.translation.recycler;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;

import io.reactivex.subjects.PublishSubject;
import io.reactivex.subjects.Subject;
import ru.inwords.inwords.R;
import ru.inwords.inwords.data.dto.WordTranslation;
import ru.inwords.inwords.presentation.viewScenario.octoGame.BaseSingleTypeAdapter;

public class WordTranslationsAdapter extends
        BaseSingleTypeAdapter<WordTranslation, WordTranslationsAdapter.WordViewHolder> {

    public WordTranslationsAdapter(LayoutInflater layoutInflater, PublishSubject<WordTranslation> onItemClickedListener) {
        super(new ArrayList<>(), layoutInflater, onItemClickedListener);
    }

    @NonNull
    @Override
    public WordViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = inflater.inflate(R.layout.list_item_word, parent, false);

        return new WordViewHolder(v, onItemClickedListener);
    }

    @Override
    public void onBindViewHolder(@NonNull final WordViewHolder holder, int position) {
        WordTranslation wordTranslation = values.get(position);
        holder.bind(wordTranslation);
    }

    static final class WordViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {
        TextView tv_word_native;
        TextView tv_word_foreign;
        Subject<WordTranslation> onItemClickedListener;
        WordTranslation wordTranslation;

        WordViewHolder(View itemView, Subject<WordTranslation> onItemClickedListener) {
            super(itemView);
            this.onItemClickedListener = onItemClickedListener;

            tv_word_native = itemView.findViewById(R.id.tv_word_native);
            tv_word_foreign = itemView.findViewById(R.id.tv_word_foreign);

            itemView.setOnClickListener(this);
        }

        void bind(WordTranslation wordTranslation) {
            this.wordTranslation = wordTranslation;

            tv_word_native.setText(wordTranslation.getWordNative());
            tv_word_foreign.setText(wordTranslation.getWordForeign());
        }

        @Override
        public void onClick(View v) {
            if (onItemClickedListener != null) {
                onItemClickedListener.onNext(wordTranslation);
            }
        }
    }

}
