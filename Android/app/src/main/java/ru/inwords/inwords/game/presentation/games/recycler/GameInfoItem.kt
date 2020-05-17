package ru.inwords.inwords.game.presentation.games.recycler

import android.net.Uri
import android.view.View
import androidx.core.view.isVisible
import com.facebook.imagepipeline.request.ImageRequestBuilder
import com.xwray.groupie.Item
import com.xwray.groupie.viewbinding.BindableItem
import ru.inwords.inwords.R
import ru.inwords.inwords.databinding.GameInfoBinding
import ru.inwords.inwords.game.domain.model.GameInfo

class GameInfoItem internal constructor(
    private val gameInfo: GameInfo,
    private val onItemClickedListener: ((GameInfo) -> Unit)?,
    private val onSaveToDictionaryClickedListener: ((GameInfo) -> Unit)?
) : BindableItem<GameInfoBinding>(gameInfo.gameId.toLong()), View.OnClickListener {

    override fun onClick(v: View) {
        onItemClickedListener?.invoke(gameInfo)
    }

    override fun bind(viewBinding: GameInfoBinding, position: Int) {
        viewBinding.actionButton1.setOnClickListener(this)
        viewBinding.saveToDictionary.setOnClickListener {
            onSaveToDictionaryClickedListener?.invoke(gameInfo)
        }

        viewBinding.primaryText.text = gameInfo.title
        viewBinding.subText.text = gameInfo.description

        if (gameInfo.loading) {
            viewBinding.saveToDictionary.isVisible = false
            viewBinding.saveToDictionaryLoading.isVisible = true
        } else {
            viewBinding.saveToDictionary.isVisible = true
            viewBinding.saveToDictionaryLoading.isVisible = false
        }

        val request = ImageRequestBuilder.newBuilderWithSource(Uri.parse(gameInfo.picture))
            .setProgressiveRenderingEnabled(true)
            .setLocalThumbnailPreviewsEnabled(true)
            .build()

        viewBinding.mediaImage.setImageRequest(request)
    }

    override fun getLayout() = R.layout.game_info
    override fun initializeViewBinding(view: View): GameInfoBinding = GameInfoBinding.bind(view)

    override fun hasSameContentAs(other: Item<*>): Boolean {
        return (other as? GameInfoItem)?.gameInfo == gameInfo
    }
}
