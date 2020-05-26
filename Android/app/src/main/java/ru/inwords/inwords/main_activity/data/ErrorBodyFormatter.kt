package ru.inwords.inwords.main_activity.data

import io.grpc.StatusRuntimeException
import java.io.IOException

fun getErrorMessage(e: StatusRuntimeException): String =
        try {
            e.message
        } catch (e1: IOException) {
            e1.printStackTrace()
            null
        } ?: "Undefined error"


