package com.dreamproject.inwords.util;

import okhttp3.ResponseBody;
import retrofit2.HttpException;

public class ErrorBodyFormatter {
    public static String getErrorMessage(HttpException e){
        String message = "Undefined error";

        ResponseBody responseBody = e.response().errorBody();
        if (responseBody != null)
            message = responseBody.toString();

        return message;
    }
}
