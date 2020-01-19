package ru.inwords.inwords.policy.presentation

import android.content.Intent
import android.net.Uri
import android.text.SpannableString
import android.text.Spanned
import android.text.method.LinkMovementMethod
import android.text.style.ClickableSpan
import android.view.View
import android.widget.TextView
import ru.inwords.inwords.BuildConfig
import ru.inwords.inwords.R

fun renderPolicyText(textView: TextView) {
    val context = textView.context

    val spannableString = SpannableString(context.getString(R.string.policy_privacy_agreement))
    val startPos = spannableString.lastIndexOf('\n') + 1
    val endPos = spannableString.length
    val clickableSpan = object : ClickableSpan() {
        override fun onClick(textView: View) {
            val browserIntent = Intent(Intent.ACTION_VIEW, Uri.parse(BuildConfig.POLICY_PRIVACY_URL))
            if (browserIntent.resolveActivity(context.packageManager) != null)
                context.startActivity(browserIntent)
        }
    }
    spannableString.setSpan(clickableSpan, startPos, endPos, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE)

    textView.movementMethod = LinkMovementMethod.getInstance()
    textView.text = spannableString
}