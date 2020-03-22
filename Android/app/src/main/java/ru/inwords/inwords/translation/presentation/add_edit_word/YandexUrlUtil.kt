package ru.inwords.inwords.translation.presentation.add_edit_word

import android.net.Uri
import android.widget.TextView
import ru.inwords.inwords.R
import ru.inwords.inwords.core.utils.setSpannableUri

fun renderYandexDictionaryText(textView: TextView) {
    val context = textView.context

    val text = context.getString(R.string.yandex_dictionary)
    val startPos = 0
    val endPos = text.length

    val url = Uri.parse(context.getString(R.string.yandex_dictionary_url))

    setSpannableUri(textView, text, url, startPos, endPos, changeStyle = false)
}