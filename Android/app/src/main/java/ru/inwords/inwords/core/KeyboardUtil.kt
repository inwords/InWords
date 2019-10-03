package ru.inwords.inwords.core


import android.content.Context
import android.view.View
import android.view.inputmethod.InputMethodManager

object KeyboardUtils {
    /**
     * Показать клавиатуру, нужна [view] с фокусом
     */
    fun showKeyboard(view: View) {
        view.post {
            if (view.requestFocus()) {
                (view.context.getSystemService(Context.INPUT_METHOD_SERVICE) as? InputMethodManager)
                    ?.showSoftInput(view, InputMethodManager.SHOW_IMPLICIT)
            }
        }
    }

    /**
     * Скрыть клавиатуру
     */
    fun hideKeyboard(rootView: View?) {
        (rootView?.context?.getSystemService(Context.INPUT_METHOD_SERVICE) as? InputMethodManager)
            ?.hideSoftInputFromWindow(rootView.windowToken, 0)
    }
}
