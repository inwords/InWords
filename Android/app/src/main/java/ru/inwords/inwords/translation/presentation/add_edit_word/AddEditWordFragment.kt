package ru.inwords.inwords.translation.presentation.add_edit_word


import android.os.Bundle
import android.view.View
import androidx.navigation.fragment.navArgs
import kotlinx.android.synthetic.main.fragment_add_edit_word.*
import ru.inwords.inwords.R
import ru.inwords.inwords.core.AfterTextChangedWatcher
import ru.inwords.inwords.core.utils.KeyboardUtils
import ru.inwords.inwords.core.utils.observe
import ru.inwords.inwords.core.validation.ValidationResult
import ru.inwords.inwords.presentation.view_scenario.FragmentWithViewModelAndNav
import ru.inwords.inwords.translation.data.bean.WordTranslation
import ru.inwords.inwords.translation.presentation.TranslationViewModelFactory

class AddEditWordFragment : FragmentWithViewModelAndNav<AddEditWordViewModel, TranslationViewModelFactory>() {
    override val layout = R.layout.fragment_add_edit_word
    override val classType = AddEditWordViewModel::class.java

    private val args by navArgs<AddEditWordFragmentArgs>()

    private val isEditing: Boolean
        get() {
            return args.wordTranslation.wordNative.isEmpty()
        }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setupWithNavController(toolbar)

        val wordToEdit = args.wordTranslation

        setupViewState(wordToEdit)

        setupValidation()

        observe(viewModel.addEditDoneLiveData) {
            if (it.handle()) {
                toolbar.requestFocus() //TODO другой метод скрытия клавиатуры?
                KeyboardUtils.hideKeyboard(view)
            }
        }

        buttonConfirm.setOnClickListener {
            val enteredWord = getEnteredWord()

            if (isEditing) {
                viewModel.onEditWordDone(enteredWord, wordToEdit)
            } else {
                viewModel.onAddWordDone(enteredWord)
            }
        }
    }

    private fun setupValidation() {
        native_word_edit_text.addTextChangedListener(AfterTextChangedWatcher { native_word_layout.error = null })
        foreign_word_edit_text.addTextChangedListener(AfterTextChangedWatcher { foreign_word_layout.error = null })

        observe(viewModel.validationLiveData) {
            if (it.wordNativeState is ValidationResult.Error) {
                native_word_layout.error = it.wordNativeState.message
            }
            if (it.wordForeignState is ValidationResult.Error) {
                foreign_word_layout.error = it.wordForeignState.message
            }
        }
    }

    private fun getEnteredWord(): WordTranslation {
        val wordForeign = foreign_word_edit_text.text.toString()
        val wordNative = native_word_edit_text.text.toString()

        return WordTranslation(wordForeign, wordNative)
    }

    private fun setupViewState(wordToEdit: WordTranslation) {
        if (wordToEdit.wordNative.isEmpty()) {
            buttonConfirm.text = getString(R.string.button_add_text)
        } else {
            buttonConfirm.text = getString(R.string.button_edit_text)
        }

        renderEditingWords(wordToEdit)
    }

    private fun renderEditingWords(wordTranslation: WordTranslation) {
        native_word_edit_text.setText(wordTranslation.wordNative)
        foreign_word_edit_text.setText(wordTranslation.wordForeign)
    }
}
