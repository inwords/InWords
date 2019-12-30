package ru.inwords.inwords.presentation

import android.animation.ValueAnimator
import android.graphics.PorterDuff
import android.graphics.PorterDuffColorFilter
import androidx.annotation.ColorInt
import androidx.appcompat.widget.Toolbar
import com.google.android.material.appbar.AppBarLayout
import com.google.android.material.appbar.CollapsingToolbarLayout

fun createAppBarNavIconOnScrimColorAnimatorListener(
    toolbar: Toolbar,
    collapsingToolbarLayout: CollapsingToolbarLayout,
    @ColorInt colorExpanded: Int,
    @ColorInt colorCollapsed: Int
): AppBarLayout.OnOffsetChangedListener {
    val expandAnimator = ValueAnimator.ofArgb(colorExpanded, colorCollapsed)
        .apply {
            addUpdateListener {
                toolbar.navigationIcon?.colorFilter = PorterDuffColorFilter(it.animatedValue as Int, PorterDuff.Mode.SRC_ATOP)
            }
        }

    val collapseAnimator = ValueAnimator.ofArgb(colorCollapsed, colorExpanded)
        .apply {
            addUpdateListener {
                toolbar.navigationIcon?.colorFilter = PorterDuffColorFilter(it.animatedValue as Int, PorterDuff.Mode.SRC_ATOP)
            }
        }

    var expanded = false

    return AppBarLayout.OnOffsetChangedListener { _, verticalOffset ->
        if (collapsingToolbarLayout.height + verticalOffset < collapsingToolbarLayout.scrimVisibleHeightTrigger) {
            if (!expandAnimator.isStarted && expanded) {
                expanded = !expanded
                collapseAnimator.cancel()
                expandAnimator.start()
            }
        } else {
            if (!collapseAnimator.isStarted && !expanded) {
                expanded = !expanded
                expandAnimator.cancel()
                collapseAnimator.start()
            }
        }
    }
}