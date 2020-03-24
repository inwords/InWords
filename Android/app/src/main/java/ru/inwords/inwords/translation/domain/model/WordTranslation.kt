package ru.inwords.inwords.translation.domain.model

import android.os.Parcelable
import kotlinx.android.parcel.Parcelize

@Parcelize
data class WordTranslation(
    val wordForeign: String,
    val wordNative: String,
    val id: Long = 0,
    val serverId: Int = 0
) : Parcelable