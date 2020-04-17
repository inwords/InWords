package ru.inwords.inwords.authorisation.presentation.login

import androidx.appcompat.app.AlertDialog
import ru.inwords.inwords.R
import ru.inwords.inwords.authorisation.presentation.AuthorisationViewModelFactory
import ru.inwords.inwords.presentation.view_scenario.FragmentWithViewModelAndNav

fun FragmentWithViewModelAndNav<*, AuthorisationViewModelFactory, *>.showSignOutAndSignInDialog(
    onNegative: () -> Unit,
    onConfirm: () -> Unit,
    onDismissWithoutAction: () -> Unit
) {
    var action = false

    AlertDialog.Builder(requireContext())
        .setNegativeButton(getString(R.string.not_now)) { _, _ ->
            action = true
            onNegative.invoke()
        }
        .setPositiveButton(getString(R.string.continue_str)) { _, _ ->
            action = true
            onConfirm.invoke()
        }
        .setOnDismissListener {
            if (!action) {
                onDismissWithoutAction.invoke()
            }
        }
        .setTitle(getString(R.string.session_will_be_terminated))
        .setMessage(getString(R.string.you_can_choose_the_account_to_login))
        .show()
}