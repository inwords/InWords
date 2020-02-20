package ru.inwords.inwords.home.viewholders

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.facebook.shimmer.ShimmerFrameLayout
import ru.inwords.inwords.home.recycler.CardWrapper

class ProfileLoadingViewHolder(itemView: View, private val onItemClickListener: (CardWrapper) -> Unit) :
    RecyclerView.ViewHolder(itemView) {
    fun bind(item: CardWrapper.ProfileLoadingMarker) {
        with(itemView as ShimmerFrameLayout) {
            startShimmer()

            setOnClickListener { onItemClickListener.invoke(item) }
        }
    }
}