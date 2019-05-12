package ru.inwords.inwords.presentation.viewScenario.octoGame

import android.view.View
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import kotlinx.android.synthetic.main.fragment_games.*
import kotlinx.android.synthetic.main.game_no_content.*
import ru.inwords.inwords.presentation.viewScenario.FragmentWithViewModelAndNav

abstract class BaseContentFragment<
        T,
        ViewModelType : ViewModel,
        ViewModelFactory : ViewModelProvider.Factory>
    : FragmentWithViewModelAndNav<ViewModelType, ViewModelFactory>() {

    protected fun showScreenState(list: List<T>) {
        if (list.isEmpty()) {
            showNoContent()
        } else {
            showContent()
        }
    }

    protected fun showContent() {
        game_no_content.visibility = View.GONE
        game_content.visibility = View.VISIBLE
        /*
            game_menu.setOnClickListener { showPopupMenu(it) }
            game_menu.tag = gameInfo
         */
    }

    protected fun showNoContent() {
        game_no_content.visibility = View.VISIBLE
        game_content.visibility = View.GONE
    }
}
