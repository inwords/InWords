package com.dreamproject.inwords.viewScenario.translation.recycler;

public interface ItemTouchHelperEvents {
    void onItemMove(int fromPosition, int toPosition);

    void onItemDismiss(int position);
}
