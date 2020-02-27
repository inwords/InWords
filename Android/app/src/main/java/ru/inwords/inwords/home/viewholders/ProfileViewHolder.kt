package ru.inwords.inwords.home.viewholders

import android.net.Uri
import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.facebook.imagepipeline.request.ImageRequestBuilder
import ru.inwords.inwords.R
import ru.inwords.inwords.databinding.CardProfileBinding
import ru.inwords.inwords.home.recycler.CardWrapper
import ru.inwords.inwords.presentation.setPlaceholderImageWithBackground

class ProfileViewHolder(
    itemView: View, private val onItemClickListener: (CardWrapper) -> Unit
) : RecyclerView.ViewHolder(itemView) {
    private val binding: CardProfileBinding = CardProfileBinding.bind(itemView)

    fun bind(item: CardWrapper.ProfileModel) {
        val user = item.user

        if (user.avatar != null) {
            val request = ImageRequestBuilder.newBuilderWithSource(Uri.parse(user.avatar))
                .setProgressiveRenderingEnabled(true)
                .setLocalThumbnailPreviewsEnabled(true)
                .build()

            binding.avatar.setImageRequest(request)
        } else {
            binding.avatar.setPlaceholderImageWithBackground(R.drawable.ic_octopus1, R.color.colorSecondary)
        }

        binding.experience.text = itemView.context.getString(R.string.user_experience, 15)
        binding.name.text = user.userName

        binding.root.setOnClickListener { onItemClickListener.invoke(item) }
    }
}