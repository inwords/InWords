package ru.inwords.inwords.game.presentation

import android.os.Bundle
import android.view.View
import androidx.annotation.IdRes
import androidx.lifecycle.ViewModelProvider
import androidx.viewbinding.ViewBinding
import ru.inwords.inwords.R
import ru.inwords.inwords.presentation.view_scenario.BasicViewModel
import ru.inwords.inwords.presentation.view_scenario.FragmentWithViewModelAndNav

abstract class BaseContentFragment<
    T,
    ViewModelType : BasicViewModel,
    ViewModelFactory : ViewModelProvider.Factory,
    Binding : ViewBinding>
    : FragmentWithViewModelAndNav<ViewModelType, ViewModelFactory, Binding>() {

    protected lateinit var gameContent: View
    protected lateinit var gameNoContent: View

    @get:IdRes
    abstract val noContentViewId: Int

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        gameContent = view.findViewById(noContentViewId)
        gameNoContent = view.findViewById(R.id.game_no_content)
    }

    protected fun showScreenState(list: List<T>) {
        if (list.isEmpty()) {
            showNoContent()
        } else {
            showContent()
        }
    }

    protected fun showContent() {
        gameNoContent.visibility = View.GONE
        gameContent.visibility = View.VISIBLE
        /*
            game_menu.setOnClickListener { showPopupMenu(it) }
            game_menu.tag = gameInfo
         */
    }

    protected fun showNoContent() {
        gameNoContent.visibility = View.VISIBLE
        gameContent.visibility = View.GONE
    }
}
