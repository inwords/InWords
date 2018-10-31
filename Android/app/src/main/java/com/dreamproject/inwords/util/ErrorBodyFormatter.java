package com.dreamproject.inwords.util;

import java.io.IOException;

import okhttp3.ResponseBody;
import retrofit2.HttpException;

public class ErrorBodyFormatter {
    public static String getErrorMessage(HttpException e){
        String message = "Undefined error";

        ResponseBody responseBody = e.response().errorBody();
        if (responseBody != null) {
            try {
                message = responseBody.string();
            } catch (IOException e1) {
                e1.printStackTrace();
            }
        }

        return message;
    }
}
