package ru.inwords.inwords.core

import android.util.Log
import java.time.DateTimeException
import java.time.Instant
import java.time.ZoneOffset
import java.time.format.DateTimeFormatter

private val grpcApiDateTimeFormatter = DateTimeFormatter.ISO_DATE_TIME
    .withZone(ZoneOffset.UTC)

fun parseInstantDefault(source: String): Instant? {
    return try {
        val temporalAccessor = grpcApiDateTimeFormatter.parse(source)
        Instant.from(temporalAccessor)
    } catch (e: DateTimeException) {
        Log.w("parseInstantDefault", e)
        null
    }
}

fun instantToStringDefault(instant: Instant): String {
   return grpcApiDateTimeFormatter.format(instant)
}