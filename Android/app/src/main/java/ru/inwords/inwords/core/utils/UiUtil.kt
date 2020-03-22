package ru.inwords.inwords.core.utils

import android.content.Intent
import android.net.Uri
import android.text.SpannableString
import android.text.Spanned
import android.text.TextPaint
import android.text.method.LinkMovementMethod
import android.text.style.ClickableSpan
import android.view.View
import android.widget.TextView

fun setSpannableUri(textView: TextView, text: String, uri: Uri, startPos: Int, endPos: Int, changeStyle: Boolean = true) {
    val context = textView.context

    val spannableString = SpannableString(text)

    val clickableSpan = object : ClickableSpan() {
        override fun onClick(textView: View) {
            val browserIntent = Intent(Intent.ACTION_VIEW, uri)
            if (browserIntent.resolveActivity(context.packageManager) != null)
                context.startActivity(browserIntent)
        }

        override fun updateDrawState(ds: TextPaint) {
            if (changeStyle) {
                super.updateDrawState(ds)
            }
        }
    }
    spannableString.setSpan(clickableSpan, startPos, endPos, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE)

    textView.movementMethod = LinkMovementMethod.getInstance()
    textView.text = spannableString
}