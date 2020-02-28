package ru.inwords.inwords.translation.presentation.add_edit_word


import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.navigation.fragment.navArgs
import ru.inwords.inwords.R
import ru.inwords.inwords.core.AfterTextChangedWatcher
import ru.inwords.inwords.core.utils.KeyboardUtils
import ru.inwords.inwords.core.utils.observe
import ru.inwords.inwords.core.validation.ValidationResult
import ru.inwords.inwords.databinding.FragmentAddEditWordBinding
import ru.inwords.inwords.presentation.view_scenario.FragmentWithViewModelAndNav
import ru.inwords.inwords.translation.data.bean.WordTranslation
import ru.inwords.inwords.translation.presentation.TranslationViewModelFactory

class AddEditWordFragment : FragmentWithViewModelAndNav<AddEditWordViewModel, TranslationViewModelFactory, FragmentAddEditWordBinding>() {
    override val layout = R.layout.fragment_add_edit_word
    override val classType = AddEditWordViewModel::class.java

    override fun bindingInflate(inflater: LayoutInflater, container: ViewGroup?, attachToRoot: Boolean): FragmentAddEditWordBinding {
        return FragmentAddEditWordBinding.inflate(inflater, container, attachToRoot)
    }

    private val args by navArgs<AddEditWordFragmentArgs>()

    private val isEditing: Boolean
        get() {
            return args.wordTranslation.wordNative.isEmpty()
        }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setupWithNavController(binding.toolbar)

        val wordToEdit = args.wordTranslation

        setupViewState(wordToEdit)

        setupValidation()

        observe(viewModel.addEditDoneLiveData) {
            if (it.handle()) {
                binding.toolbar.requestFocus() //TODO другой метод скрытия клавиатуры?
                KeyboardUtils.hideKeyboard(view)
            }
        }

        binding.buttonConfirm.setOnClickListener {
            val enteredWord = getEnteredWord()

            if (isEditing) {
                viewModel.onEditWordDone(enteredWord, wordToEdit)
            } else {
                viewModel.onAddWordDone(enteredWord)
            }
        }
    }

    private fun setupValidation() {
        binding.nativeWordEditText.addTextChangedListener(AfterTextChangedWatcher { binding.nativeWordLayout.error = null })
        binding.foreignWordEditText.addTextChangedListener(AfterTextChangedWatcher { binding.foreignWordLayout.error = null })

        observe(viewModel.validationLiveData) {
            if (it.wordNativeState is ValidationResult.Error) {
                binding.nativeWordLayout.error = it.wordNativeState.message
            }
            if (it.wordForeignState is ValidationResult.Error) {
                binding.foreignWordLayout.error = it.wordForeignState.message
            }
        }
    }

    private fun getEnteredWord(): WordTranslation {
        val wordForeign = binding.foreignWordEditText.text.toString()
        val wordNative = binding.nativeWordEditText.text.toString()

        return WordTranslation(wordForeign, wordNative)
    }

    private fun setupViewState(wordToEdit: WordTranslation) {
        if (wordToEdit.wordNative.isEmpty()) {
            binding.buttonConfirm.text = getString(R.string.button_add_text)
        } else {
            binding.buttonConfirm.text = getString(R.string.button_edit_text)
        }

        renderEditingWords(wordToEdit)
    }

    private fun renderEditingWords(wordTranslation: WordTranslation) {
        binding.nativeWordEditText.setText(wordTranslation.wordNative)
        binding.foreignWordEditText.setText(wordTranslation.wordForeign)
    }
}
