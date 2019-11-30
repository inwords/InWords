package ru.inwords.inwords.home.viewholders

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.facebook.shimmer.ShimmerFrameLayout
import io.reactivex.subjects.Subject
import ru.inwords.inwords.home.recycler.CardWrapper

class ProfileLoadingViewHolder(itemView: View, private val onItemClickListener: Subject<CardWrapper>) :
        RecyclerView.ViewHolder(itemView) {
    fun bind(item: CardWrapper.ProfileLoadingMarker) {
        with(itemView as ShimmerFrameLayout) {
            startShimmer()

            setOnClickListener { onItemClickListener.onNext(item) }
        }
    }
}