package ru.inwords.inwords.translation.presentation.translation_main

import android.view.Menu
import android.view.MenuItem
import androidx.appcompat.view.ActionMode
import androidx.core.graphics.drawable.DrawableCompat
import androidx.recyclerview.selection.SelectionTracker
import ru.inwords.inwords.R


class DictionaryActionModeController(
        private val tracker: SelectionTracker<*>
) : ActionMode.Callback {
    override fun onActionItemClicked(mode: ActionMode, item: MenuItem): Boolean {
        return false
    }

    override fun onCreateActionMode(mode: ActionMode, menu: Menu): Boolean {
        mode.menuInflater.inflate(R.menu.dictionary_menu_action_mode, menu)

        val itemRemove = menu.findItem(R.id.remove)

        val drawable = DrawableCompat.wrap(itemRemove.icon)
        DrawableCompat.setTint(drawable, (0xffffffff).toInt())
        itemRemove.icon = drawable

        return true
    }

    override fun onPrepareActionMode(mode: ActionMode, menu: Menu): Boolean {
        return true
    }

    override fun onDestroyActionMode(mode: ActionMode) {
        tracker.clearSelection()
    }
}