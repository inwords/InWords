package com.dreamproject.inwords.viewScenario.translation.translationMain;


import android.content.Context;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.widget.DividerItemDecoration;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.helper.ItemTouchHelper;
import android.view.LayoutInflater;
import android.view.View;

import com.dreamproject.inwords.R;
import com.dreamproject.inwords.core.RxDiffUtil;
import com.dreamproject.inwords.core.util.SchedulersFacade;
import com.dreamproject.inwords.data.entity.WordTranslation;
import com.dreamproject.inwords.viewScenario.FragmentWithViewModelAndNav;
import com.dreamproject.inwords.viewScenario.translation.recycler.ItemTouchHelperAdapter;
import com.dreamproject.inwords.viewScenario.translation.recycler.ItemTouchHelperEvents;
import com.dreamproject.inwords.viewScenario.translation.recycler.WordTranslationsAdapter;
import com.dreamproject.inwords.viewScenario.translation.recycler.WordTranslationsDiffUtilCallback;
import com.jakewharton.rxbinding2.view.RxView;

import java.util.List;

import io.reactivex.BackpressureStrategy;
import io.reactivex.disposables.CompositeDisposable;
import io.reactivex.subjects.PublishSubject;

public class TranslationMainFragment extends FragmentWithViewModelAndNav<TranslationMainViewModel, TranslationMainViewModelFactory> implements
        ItemTouchHelperEvents {
    private RecyclerView recyclerView;
    private WordTranslationsAdapter adapter;
    private CompositeDisposable compositeDisposable = new CompositeDisposable();

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        PublishSubject<WordTranslation> onItemClickedListener = PublishSubject.create();
        setupRecyclerView(view, onItemClickedListener);

        viewModel.getAddEditWordLiveData().observe(this, event -> {
            if (event != null && event.handle()) {
                Bundle args;
                WordTranslation wordTranslation = event.peekContent();
                if (wordTranslation == null) {
                    args = null;
                } else {
                    args = new Bundle();
                    args.putSerializable(WordTranslation.class.getCanonicalName(), wordTranslation);
                }
                navController.navigate(R.id.action_translationMainFragment_to_addEditWordFragment, args);
            }
        });

        compositeDisposable.add(viewModel.getTranslationWordsStream()
                .compose(RxDiffUtil.calculate(WordTranslationsDiffUtilCallback::create))
                .observeOn(SchedulersFacade.ui())
                .subscribe(adapter));

        FloatingActionButton fab = view.findViewById(R.id.fab);
        viewModel.onAddClickedHandler(RxView.clicks(fab));
        viewModel.onEditClicked(onItemClickedListener.toFlowable(BackpressureStrategy.DROP).toObservable());
    }

    public List<WordTranslation> getWordTranslations() {
        return adapter.getWordTranslations();
    }

    void setupRecyclerView(@NonNull View view, PublishSubject<WordTranslation> onItemClickedListener) {
        recyclerView = view.findViewById(R.id.recycler_view);

        Context context = view.getContext();

        adapter = new WordTranslationsAdapter(LayoutInflater.from(context), onItemClickedListener);
        LinearLayoutManager layoutManager = new LinearLayoutManager(context);
        DividerItemDecoration dividerItemDecoration = new DividerItemDecoration(context, layoutManager.getOrientation());

        recyclerView.setLayoutManager(layoutManager);
        recyclerView.setAdapter(adapter);
        recyclerView.addItemDecoration(dividerItemDecoration);

        ItemTouchHelper.Callback callback = new ItemTouchHelperAdapter(this); //TODO
        ItemTouchHelper touchHelper = new ItemTouchHelper(callback);
        touchHelper.attachToRecyclerView(recyclerView);
    }


    @Override
    public void onItemDismiss(int position) {
        viewModel.onItemDismiss(getWordTranslations().get(position));
    }

    @Override
    protected int getLayout() {
        return R.layout.fragment_translation_main;
    }

    @NonNull
    @Override
    protected Class<TranslationMainViewModel> getClassType() {
        return TranslationMainViewModel.class;
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        compositeDisposable.clear();
    }
}
