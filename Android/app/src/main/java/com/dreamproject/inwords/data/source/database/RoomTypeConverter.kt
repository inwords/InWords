package com.dreamproject.inwords.data.source.database

import androidx.room.TypeConverter
import com.dreamproject.inwords.App
import com.dreamproject.inwords.data.dto.WordTranslation
import com.dreamproject.inwords.data.dto.game.GameLevelInfo
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import javax.inject.Inject

class RoomTypeConverter {
    @Inject
    internal lateinit var gson: Gson

    init {
        App.appComponent.gsonSubcomponent().build().inject(this)
    }

    @TypeConverter
    fun fromGameLevelInfos(list: List<GameLevelInfo>): String = fromList(list)

    @TypeConverter
    fun toGameLevelInfos(str: String): List<GameLevelInfo>? = toList(str)

    @TypeConverter
    fun fromWordTranslations(list: List<WordTranslation>): String = fromList(list)

    @TypeConverter
    fun toWordTranslations(str: String): List<WordTranslation> = toList(str)

    private fun fromList(list: List<*>): String {
        val type = object : TypeToken<List<Any>>() {}.type
        return gson.toJson(list, type)
    }

    private fun <T> toList(str: String): List<T> {
        val type = object : TypeToken<List<T>>() {}.type
        return gson.fromJson<List<T>>(str, type)
    }
}
