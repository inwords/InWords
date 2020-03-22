package ru.inwords.inwords.policy.presentation

import android.net.Uri
import android.widget.TextView
import ru.inwords.inwords.BuildConfig
import ru.inwords.inwords.R
import ru.inwords.inwords.core.utils.setSpannableUri

fun renderPolicyText(textView: TextView) {
    val context = textView.context

    val text = context.getString(R.string.policy_privacy_agreement)
    val startPos = text.lastIndexOf('\n') + 1
    val endPos = text.length

    setSpannableUri(textView, text, Uri.parse(BuildConfig.POLICY_PRIVACY_URL), startPos, endPos)
}