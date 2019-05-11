package ru.inwords.shimmer_recycler;

import android.view.LayoutInflater;
import android.view.ViewGroup;

import androidx.recyclerview.widget.RecyclerView;

class ShimmerViewHolder extends RecyclerView.ViewHolder {
    ShimmerViewHolder(LayoutInflater inflater, ViewGroup parent, int innerViewResId) {
        super(inflater.inflate(innerViewResId, parent, false));
    }
}
