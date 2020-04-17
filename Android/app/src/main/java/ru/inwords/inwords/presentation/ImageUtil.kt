package ru.inwords.inwords.presentation

import android.graphics.drawable.ColorDrawable
import androidx.annotation.ColorRes
import androidx.annotation.DrawableRes
import androidx.core.content.ContextCompat
import com.facebook.drawee.generic.GenericDraweeHierarchyBuilder
import com.facebook.drawee.view.SimpleDraweeView

fun SimpleDraweeView.setPlaceholderImageWithBackground(@DrawableRes drawableRes: Int, @ColorRes backgroundColor: Int) {
    val background = ContextCompat.getColor(context, backgroundColor)

    hierarchy = GenericDraweeHierarchyBuilder.newInstance(context.resources)
            .setBackground(ColorDrawable(background))
            .setPlaceholderImage(drawableRes)
            .build()
}