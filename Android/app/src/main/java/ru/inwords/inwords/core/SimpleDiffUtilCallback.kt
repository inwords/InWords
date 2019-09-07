package ru.inwords.inwords.core

import androidx.recyclerview.widget.DiffUtil

abstract class SimpleDiffUtilCallback<T : Any>(private val oldItems: List<T>, private val newItems: List<T>) : DiffUtil.Callback() {

    abstract fun areItemsTheSame(oldItem: T, newItem: T): Boolean

    protected abstract fun areContentsTheSame(oldItem: T, newItem: T): Boolean

    override fun getOldListSize() = oldItems.size

    override fun getNewListSize() = newItems.size

    override fun areItemsTheSame(oldItemPosition: Int, newItemPosition: Int): Boolean {
        val oldItem = oldItems[oldItemPosition]
        val newItem = newItems[newItemPosition]
        return areItemsTheSame(oldItem, newItem)
    }

    override fun areContentsTheSame(oldItemPosition: Int, newItemPosition: Int): Boolean {
        val oldItem = oldItems[oldItemPosition]
        val newItem = newItems[newItemPosition]
        return areContentsTheSame(oldItem, newItem)
    }
}

class BasicDiffUtilCallback<T : Any> private constructor(old: List<T>, new: List<T>) : SimpleDiffUtilCallback<T>(old, new) {
    override fun areItemsTheSame(oldItem: T, newItem: T): Boolean {
        return oldItem == newItem
    }

    override fun areContentsTheSame(oldItem: T, newItem: T): Boolean {
        return oldItem == newItem
    }

    companion object {
        fun <T : Any> create(old: List<T>, new: List<T>): BasicDiffUtilCallback<T> {
            return BasicDiffUtilCallback(old, new)
        }
    }
}