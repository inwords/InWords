package ru.inwords.inwords.core;

import java.util.Arrays;

public class ObjectsUtil {
    public static boolean equals(Object a, Object b) {
        return (a == b) || (a != null && a.equals(b));
    }

    public static int hash(Object... values) {
        return Arrays.hashCode(values);
    }

    public static boolean nonNull(Object obj) {
        return obj != null;
    }
}
