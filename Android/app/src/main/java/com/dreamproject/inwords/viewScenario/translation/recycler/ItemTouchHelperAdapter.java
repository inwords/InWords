package com.dreamproject.inwords.viewScenario.translation.recycler;

import android.support.annotation.NonNull;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.helper.ItemTouchHelper;

import com.dreamproject.inwords.viewScenario.translation.TranslationWordsPresenter;

public class ItemTouchHelperAdapter extends ItemTouchHelper.Callback {
    private final WordTranslationsAdapter adapter;
    private final TranslationWordsPresenter presenter;

    public ItemTouchHelperAdapter(WordTranslationsAdapter adapter, TranslationWordsPresenter presenter) {
        this.adapter = adapter;
        this.presenter = presenter;
    }

    @Override
    public int getMovementFlags(@NonNull RecyclerView recyclerView, @NonNull RecyclerView.ViewHolder viewHolder) {
        int dragFlags = ItemTouchHelper.UP | ItemTouchHelper.DOWN;
        int swipeFlags = ItemTouchHelper.END;
        return makeMovementFlags(dragFlags, swipeFlags);
    }

    @Override
    public boolean onMove(@NonNull RecyclerView recyclerView, @NonNull RecyclerView.ViewHolder viewHolder, @NonNull RecyclerView.ViewHolder viewHolder1) {
        adapter.onItemMove(viewHolder.getAdapterPosition(), viewHolder1.getAdapterPosition());

        return true;
    }

    @Override
    public void onSwiped(@NonNull RecyclerView.ViewHolder viewHolder, int direction) {
        int position = viewHolder.getAdapterPosition();
        presenter.removeElement(adapter.getWordTranslations().get(position));
        adapter.onItemDismiss(position);
    }

    @Override
    public boolean isLongPressDragEnabled() {
        return true;
    }

    @Override
    public boolean isItemViewSwipeEnabled() {
        return true;
    }
}
