package ru.inwords.inwords.core.utils

import androidx.fragment.app.Fragment
import androidx.lifecycle.LiveData
import androidx.lifecycle.Observer

inline fun <reified T : Any, reified L : LiveData<T>> Fragment.observe(
    liveData: L,
    noinline block: (T) -> Unit
) {
    liveData.observe(viewLifecycleOwner, Observer<T> { value -> value?.let { block.invoke(it) } })
}