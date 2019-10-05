package ru.inwords.inwords.presentation.view_scenario

import android.os.Bundle
import androidx.preference.PreferenceFragmentCompat
import androidx.preference.PreferenceManager
import ru.inwords.inwords.R


class SettingsFragment : PreferenceFragmentCompat() {
    override fun onCreatePreferences(savedInstanceState: Bundle?, rootKey: String?) {
        addPreferencesFromResource(R.xml.fragment_settings)
        PreferenceManager.setDefaultValues(requireContext(), R.xml.fragment_settings, false)
    }
}