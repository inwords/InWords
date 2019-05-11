package ru.inwords.inwords.data.source.database

import androidx.room.TypeConverter
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import ru.inwords.inwords.App
import ru.inwords.inwords.data.dto.WordTranslation
import ru.inwords.inwords.data.dto.game.GameLevelInfo
import java.lang.reflect.Type
import javax.inject.Inject

class RoomTypeConverter {
    @Inject
    internal lateinit var gson: Gson

    init {
        App.appComponent.inject(this)
    }

    @TypeConverter
    fun fromGameLevelInfos(list: List<GameLevelInfo>): String = fromList(list)

    @TypeConverter
    fun toGameLevelInfos(str: String): List<GameLevelInfo> =
            toList(str, object : TypeToken<List<GameLevelInfo>>() {}.type)

    @TypeConverter
    fun fromWordTranslations(list: List<WordTranslation>): String = fromList(list)

    @TypeConverter
    fun toWordTranslations(str: String): List<WordTranslation> =
            toList(str, object : TypeToken<List<WordTranslation>>() {}.type)

    private inline fun <reified T> fromList(list: T): String {
        return gson.toJson(list, T::class.java)
    }

    private fun <T> toList(str: String, type: Type): List<T> { //TODO KOTLIN SHIT WITH TYPES
        return gson.fromJson<List<T>>(str, type)
    }
}
