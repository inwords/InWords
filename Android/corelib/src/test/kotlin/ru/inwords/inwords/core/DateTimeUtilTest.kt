package ru.inwords.inwords.core

import android.util.Log
import io.mockk.every
import io.mockk.mockkStatic
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import java.time.Instant
import java.time.ZoneOffset
import java.util.*

internal class DateTimeUtilTest {

    @Test
    fun testParseInstantDefault() {
        assertEquals(
            expectedInstant(2020, 2, 9, 0, 0, 0),
            parseInstantDefault("2020-03-09T00:00:00.0000000")
        )

        assertEquals(
            expectedInstant(2020, 1, 28, 18, 18, 24),
            parseInstantDefault("2020-02-28T18:18:24.0000000")
        )

        mockkStatic(Log::class)
        every { Log.w(any(), any<Throwable>()) } returns 0
        assertEquals(
            null,
            parseInstantDefault("2020-02-28T")
        )
    }

    @Test
    fun testInstantToStringDefault() {
        assertEquals(
            "2020-02-28T18:18:24Z",
            instantToStringDefault(expectedInstant(2020, 1, 28, 18, 18, 24))
        )

        assertEquals(
            "2020-03-09T00:00:00Z",
            instantToStringDefault(expectedInstant(2020, 2, 9, 0, 0, 0))
        )
    }

    private fun expectedInstant(year: Int, month: Int, date: Int, hourOfDay: Int, minute: Int, second: Int): Instant {
        return Calendar.getInstance(TimeZone.getTimeZone(ZoneOffset.UTC)).apply {
            set(year, month, date, hourOfDay, minute, second)
            set(Calendar.MILLISECOND, 0)
        }.toInstant()
    }
}