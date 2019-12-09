package ru.inwords.inwords.presentation

import android.content.Context
import android.util.AttributeSet
import android.view.View
import androidx.coordinatorlayout.widget.CoordinatorLayout
import com.google.android.material.bottomnavigation.BottomNavigationView
import kotlin.math.roundToInt

class ScrollingViewWithBottomNavigationBehavior @JvmOverloads constructor(
    context: Context? = null,
    attrs: AttributeSet? = null
) : CoordinatorLayout.Behavior<View>(context, attrs) {
    // We add a bottom margin to avoid the bottom navigation bar
    private var bottomMargin = 0

    override fun layoutDependsOn(parent: CoordinatorLayout, child: View, dependency: View): Boolean {
        return super.layoutDependsOn(parent, child, dependency) || dependency is BottomNavigationView
    }

    override fun onDependentViewChanged(parent: CoordinatorLayout, child: View, dependency: View): Boolean {
        val result = super.onDependentViewChanged(parent, child, dependency)

        return if (dependency is BottomNavigationView) {
            bottomMargin = dependency.height - dependency.translationY.roundToInt()

            val layout = child.layoutParams as CoordinatorLayout.LayoutParams

            if (layout.bottomMargin != bottomMargin) {
                layout.bottomMargin = bottomMargin
                child.requestLayout()
            }
            true
        } else {
            result
        }
    }
}