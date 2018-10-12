package com.dreamproject.inwords.viewScenario.translation;


import android.content.Context;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v7.widget.DividerItemDecoration;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.helper.ItemTouchHelper;
import android.view.View;

import com.dreamproject.inwords.BasePresenter;
import com.dreamproject.inwords.R;
import com.dreamproject.inwords.data.entity.WordTranslation;
import com.dreamproject.inwords.viewScenario.PresenterNavFragment;
import com.dreamproject.inwords.viewScenario.translation.recycler.ItemTouchHelperAdapter;
import com.dreamproject.inwords.viewScenario.translation.recycler.ItemTouchHelperEvents;
import com.dreamproject.inwords.viewScenario.translation.recycler.WordTranslationsAdapter;

import java.util.List;
import java.util.Objects;

import io.reactivex.Completable;

public class TranslationMainFragment extends PresenterNavFragment implements TranslationMainView {
    private TranslationWordsPresenter presenter;

    private RecyclerView recyclerView;
    private WordTranslationsAdapter adapter;

    @Override
    public Completable updateWordTranslations(List<WordTranslation> wordTranslations) {
        return adapter.updateWordTranslations(wordTranslations);
    }

    @Override
    public List<WordTranslation> getWordTranslations() {
        return adapter.getWordTranslations();
    }

    void setupRecyclerView(@NonNull View view) {
        recyclerView = view.findViewById(R.id.recycler_view);

        Context context = view.getContext();

        adapter = new WordTranslationsAdapter(context);
        LinearLayoutManager layoutManager = new LinearLayoutManager(context);
        DividerItemDecoration dividerItemDecoration = new DividerItemDecoration(context, layoutManager.getOrientation());

        recyclerView.setLayoutManager(layoutManager);
        recyclerView.setAdapter(adapter);
        recyclerView.addItemDecoration(dividerItemDecoration);

        ItemTouchHelper.Callback callback = new ItemTouchHelperAdapter((ItemTouchHelperEvents) presenter); //TODO
        ItemTouchHelper touchHelper = new ItemTouchHelper(callback);
        touchHelper.attachToRecyclerView(recyclerView);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        setupRecyclerView(view);
        presenter.loadData(); //TODO
    }

    @Override
    protected int getLayout() {
        return R.layout.fragment_translation_main;
    }

    @Override
    protected BasePresenter getPresenter() {
        return (BasePresenter) (presenter = new TranslationWordsPresenterImpl(Objects.requireNonNull(getActivity()).getApplication(), this));
    }
}
