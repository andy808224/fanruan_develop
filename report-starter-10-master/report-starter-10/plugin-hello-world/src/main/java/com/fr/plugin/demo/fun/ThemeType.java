package com.fr.plugin.demo.fun;

/**
 * Created by shine on 2018/4/19.
 */
public enum ThemeType {
    DARK,
    WHITE;

    public static ThemeType parseInt(int index) {
        for (ThemeType type : ThemeType.values()) {
            if (type.ordinal() == index) {
                return type;
            }
        }
        return DARK;
    }
}
