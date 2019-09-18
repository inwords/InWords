package ru.inwords.inwords.presentation.viewScenario.translation.addEditWord


import android.content.Context
import android.os.Bundle
import android.view.View
import androidx.navigation.fragment.navArgs
import kotlinx.android.synthetic.main.fragment_add_edit_word.*
import ru.inwords.inwords.R
import ru.inwords.inwords.data.dto.WordTranslation
import ru.inwords.inwords.presentation.viewScenario.FragmentWithViewModelAndNav
import ru.inwords.inwords.presentation.viewScenario.translation.TranslationViewModelFactory

class AddEditWordFragment : FragmentWithViewModelAndNav<AddEditWordViewModel, TranslationViewModelFactory>() {
    override val layout = R.layout.fragment_add_edit_word
    override val classType = AddEditWordViewModel::class.java

    private val args by navArgs<AddEditWordFragmentArgs>()

    private var isEditing: Boolean = false

    private lateinit var wordToEdit: WordTranslation

    override fun onAttach(context: Context) {
        super.onAttach(context)
        wordToEdit = args.wordTranslation
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setUpViewState()

        viewModel.addEditDoneLiveData.observe(this::getLifecycle) {
            if (it.handle()) {
                popBackToTranslationMain()
            }
        }

        buttonConfirm.setOnClickListener {
            val enteredWord = getEnteredWord()

            if (isEditing) {
                viewModel.onEditWordDoneHandler(enteredWord, wordToEdit)
            } else {
                viewModel.onAddWordDoneHandler(enteredWord)
            }
        }
    }

    private fun getEnteredWord(): WordTranslation { //TODO: validate input
        val wordForeign = editTextForeignWord.text.toString()
        val wordNative = editTextNativeWord.text.toString()

        return WordTranslation(wordForeign, wordNative)
    }

    private fun setUpViewState() {
        if (wordToEdit.wordNative.isEmpty()) {
            isEditing = false

            buttonConfirm.text = getString(R.string.button_add_text)
        } else {
            isEditing = true

            buttonConfirm.text = getString(R.string.button_edit_text)
        }

        renderEditingWords(wordToEdit)
    }

    private fun renderEditingWords(wordTranslation: WordTranslation) {
        editTextNativeWord.setText(wordTranslation.wordNative)
        editTextForeignWord.setText(wordTranslation.wordForeign)
    }

    private fun popBackToTranslationMain() {
        navController.navigate(AddEditWordFragmentDirections.actionAddEditWordFragmentPop())
    }
}
