package ru.inwords.inwords.core

import android.text.Editable
import android.text.TextWatcher

class AfterTextChangedWatcher(private val onAfterTextChanged: (String) -> Unit) : TextWatcher {
    override fun afterTextChanged(s: Editable?) {
        if (s != null) {
            onAfterTextChanged.invoke(s.toString())
        }
    }

    override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {
        // do nothing
    }

    override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
        // do nothing
    }
}