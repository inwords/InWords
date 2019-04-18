package com.dreamproject.inwords.presentation.viewScenario.translation.translationMain;


import android.content.Context;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.recyclerview.widget.DividerItemDecoration;
import androidx.recyclerview.widget.ItemTouchHelper;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.dreamproject.inwords.R;
import com.dreamproject.inwords.core.RxDiffUtil;
import com.dreamproject.inwords.core.util.SchedulersFacade;
import com.dreamproject.inwords.data.dto.WordTranslation;
import com.dreamproject.inwords.presentation.viewScenario.FragmentWithViewModelAndNav;
import com.dreamproject.inwords.presentation.viewScenario.translation.TranslationViewModelFactory;
import com.dreamproject.inwords.presentation.viewScenario.translation.recycler.ItemTouchHelperAdapter;
import com.dreamproject.inwords.presentation.viewScenario.translation.recycler.ItemTouchHelperEvents;
import com.dreamproject.inwords.presentation.viewScenario.translation.recycler.WordTranslationsAdapter;
import com.dreamproject.inwords.presentation.viewScenario.translation.recycler.WordTranslationsDiffUtilCallback;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.jakewharton.rxbinding2.view.RxView;

import java.util.List;

import io.reactivex.disposables.CompositeDisposable;
import io.reactivex.subjects.PublishSubject;

public class TranslationMainFragment extends FragmentWithViewModelAndNav<TranslationMainViewModel, TranslationViewModelFactory> implements
        ItemTouchHelperEvents {
    private RecyclerView recyclerView;
    private WordTranslationsAdapter adapter;
    private final CompositeDisposable compositeDisposable = new CompositeDisposable();

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
                .compose(RxDiffUtil.INSTANCE.calculate(WordTranslationsDiffUtilCallback::create))
                .observeOn(SchedulersFacade.ui())
                .subscribe(adapter));

        FloatingActionButton fab = view.findViewById(R.id.fab);
        viewModel.onAddClickedHandler(RxView.clicks(fab));
        viewModel.onEditClicked(onItemClickedListener);
    }

    public List<WordTranslation> getWordTranslations() {
        return adapter.getValues();
    }

    private void setupRecyclerView(@NonNull View view, PublishSubject<WordTranslation> onItemClickedListener) {
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
