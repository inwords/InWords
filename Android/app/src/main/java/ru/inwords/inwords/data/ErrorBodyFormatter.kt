package ru.inwords.inwords.data

import retrofit2.HttpException
import java.io.IOException

fun getErrorMessage(e: HttpException): String =
        try {
            e.response()?.errorBody()?.string()
        } catch (e1: IOException) {
            e1.printStackTrace()
            null
        } ?: "Undefined error"


