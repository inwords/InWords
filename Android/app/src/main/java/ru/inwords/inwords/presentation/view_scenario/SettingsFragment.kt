package ru.inwords.inwords.presentation.view_scenario

import android.os.Bundle
import android.view.View
import androidx.annotation.IdRes
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentActivity
import androidx.navigation.fragment.NavHostFragment
import androidx.navigation.ui.setupWithNavController
import ru.inwords.inwords.R
import ru.inwords.inwords.databinding.FragmentSettingsToolbarBinding

class SettingsFragment : Fragment(R.layout.fragment_settings_toolbar) {
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val binding = FragmentSettingsToolbarBinding.bind(view)
        val navController = requireActivity().findNavController(R.id.main_nav_host_fragment)
        binding.toolbar.setupWithNavController(navController)
    }

    /**
     * Workaround according to https://issuetracker.google.com/issues/142847973#comment8
     */
    private fun FragmentActivity.findNavController(@IdRes viewId: Int) =
        (supportFragmentManager.findFragmentById(viewId) as NavHostFragment).navController
}