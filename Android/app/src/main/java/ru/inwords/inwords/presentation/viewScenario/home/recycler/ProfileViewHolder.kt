package ru.inwords.inwords.presentation.viewScenario.home.recycler

import android.net.Uri
import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.facebook.imagepipeline.request.ImageRequestBuilder
import io.reactivex.subjects.Subject
import kotlinx.android.synthetic.main.card_profile.view.*
import ru.inwords.inwords.R
import ru.inwords.inwords.presentation.setPlaceholderImageWithBackground

class ProfileViewHolder(itemView: View, private val onItemClickListener: Subject<CardWrapper>) :
        RecyclerView.ViewHolder(itemView) {
    fun bind(item: CardWrapper.ProfileModel) {
        val user = item.user

        with(itemView) {
            if (user.avatar != null) {
                val request = ImageRequestBuilder.newBuilderWithSource(Uri.parse(user.avatar))
                        .setProgressiveRenderingEnabled(true)
                        .setLocalThumbnailPreviewsEnabled(true)
                        .build()

                avatar.setImageRequest(request)
            } else {
                avatar.setPlaceholderImageWithBackground(R.drawable.ic_octopus1, R.color.colorSecondary)
            }

            experience.text = context.getString(R.string.user_experience, 15)
            name.text = user.userName

            setOnClickListener { onItemClickListener.onNext(item) }
        }
    }
}