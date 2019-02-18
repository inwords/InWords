package com.dreamproject.inwords.core;

public class ColorUtil {
    public static int decodeColor(final String color) {
        return Integer.decode(color) + 0xFF000000;
    }
}
