package ru.inwords.inwords.data.source.database

import androidx.room.TypeConverter
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import ru.inwords.inwords.App
import ru.inwords.inwords.core.deferred_entry_manager.model.local.Status
import ru.inwords.inwords.game.data.bean.GameLevelInfo
import ru.inwords.inwords.translation.data.bean.WordTranslation
import java.lang.reflect.Type
import javax.inject.Inject

class RoomTypeConverter {
    @Inject
    internal lateinit var gson: Gson

    init {
        App.appComponent.inject(this)
    }

    @TypeConverter
    fun fromHashMapIntInt(hashMap: Map<Int, Int>): String {
        return gson.toJson(hashMap, object : TypeToken<Map<Int, Int>>() {}.type)
    }

    @TypeConverter
    fun toHashMapIntInt(str: String): Map<Int, Int> {
        return gson.fromJson(str, object : TypeToken<Map<Int, Int>>() {}.type)
    }

    @TypeConverter
    fun fromGameLevelInfos(list: List<GameLevelInfo>): String = fromList(list)

    @TypeConverter
    fun toGameLevelInfos(str: String): List<GameLevelInfo> = toList(str, object : TypeToken<List<GameLevelInfo>>() {}.type)

    @TypeConverter
    fun fromWordTranslations(list: List<WordTranslation>): String = fromList(list)

    @TypeConverter
    fun toWordTranslations(str: String): List<WordTranslation> = toList(str, object : TypeToken<List<WordTranslation>>() {}.type)

    private inline fun <reified T> fromList(list: T): String {
        return gson.toJson(list, T::class.java)
    }

    private fun <T> toList(str: String, type: Type): List<T> { //TODO KOTLIN SHIT WITH TYPES
        return gson.fromJson(str, type)
    }
}

class RoomDeferredEntryManagerStatusConverter {
    @TypeConverter
    fun fromStatus(status: Status): String {
        return status.name
    }

    @TypeConverter
    fun toStatus(name: String): Status {
        return Status.valueOf(name)
    }
}