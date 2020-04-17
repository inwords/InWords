package ru.inwords.inwords.translation.presentation.add_edit_word


import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.navigation.fragment.navArgs
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.LinearLayoutManager.HORIZONTAL
import ru.inwords.inwords.R
import ru.inwords.inwords.core.AfterTextChangedWatcher
import ru.inwords.inwords.core.recycler.EmptySpaceItemDecoration
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.core.resource.Source
import ru.inwords.inwords.core.utils.KeyboardUtils
import ru.inwords.inwords.core.utils.observe
import ru.inwords.inwords.core.validation.ValidationResult
import ru.inwords.inwords.databinding.FragmentAddEditWordBinding
import ru.inwords.inwords.presentation.view_scenario.FragmentWithViewModelAndNav
import ru.inwords.inwords.translation.domain.model.WordTranslation
import ru.inwords.inwords.translation.presentation.TranslationViewModelFactory
import ru.inwords.inwords.translation.presentation.recycler.DictionaryTranslationViewHolder
import ru.inwords.inwords.translation.presentation.recycler.DictionaryTranslationViewHolder.State.*
import ru.inwords.inwords.translation.presentation.recycler.DictionaryTranslationsAdapter

class AddEditWordFragment : FragmentWithViewModelAndNav<AddEditWordViewModel, TranslationViewModelFactory, FragmentAddEditWordBinding>() {
    override val layout = R.layout.fragment_add_edit_word
    override val classType = AddEditWordViewModel::class.java

    override fun bindingInflate(inflater: LayoutInflater, container: ViewGroup?, attachToRoot: Boolean): FragmentAddEditWordBinding {
        return FragmentAddEditWordBinding.inflate(inflater, container, attachToRoot)
    }

    private val args by navArgs<AddEditWordFragmentArgs>()

    private val isEditing: Boolean
        get() {
            return args.wordTranslation.wordNative.isNotEmpty()
        }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setupWithNavController(binding.toolbar)

        renderYandexDictionaryText(binding.yandexDictionary)

        val wordToEdit = args.wordTranslation

        setupViewState(wordToEdit)

        val recyclerAdapter = setupTranslationsRecycler()

        setupValidation()

        val text = binding.foreignWordEditText.text?.toString().orEmpty()
        if (viewModel.translationLiveData.value == null && text.isNotBlank()) {
            viewModel.askForTranslation(text)
        }

        observe(viewModel.translationLiveData) { res ->
            recyclerAdapter.submitList(when (res) {
                is Resource.Success -> {
                    if (res.data.isEmpty()) {
                        if (res.source == Source.NETWORK) {
                            listOf(DictionaryTranslationViewHolder.Params("Нет доступного перевода", ERROR))
                        } else {
                            emptyList()
                        }
                    } else {
                        res.data.map { DictionaryTranslationViewHolder.Params(it, CONTENT) }
                    }
                }
                is Resource.Loading -> {
                    listOf(DictionaryTranslationViewHolder.Params("Загрузка перевода...", LOADING))
                }
                is Resource.Error -> {
                    listOf(DictionaryTranslationViewHolder.Params("Что-то пошло не так", ERROR))
                }
            })
        }

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

    private fun setupTranslationsRecycler(): DictionaryTranslationsAdapter {
        val recyclerAdapter = DictionaryTranslationsAdapter { translationParams ->
            val text = binding.nativeWordEditText.text?.toString()
            val newText = if (text.isNullOrBlank()) {
                translationParams.text
            } else {
                "$text; ${translationParams.text}"
            }

            binding.nativeWordEditText.setText(newText)
        }

        val linearLayoutManager = LinearLayoutManager(requireContext(), HORIZONTAL, false)
        val dividerItemDecoration = EmptySpaceItemDecoration(
            horizontalSpaceHeight = resources.getDimensionPixelSize(R.dimen.space_medium)
        )

        with(binding.translationsRecycler) {
            layoutManager = linearLayoutManager
            adapter = recyclerAdapter
            addItemDecoration(dividerItemDecoration)
        }

        return recyclerAdapter
    }

    private fun setupValidation() {
        binding.foreignWordEditText.addTextChangedListener(AfterTextChangedWatcher {
            binding.foreignWordLayout.error = null
            viewModel.askForTranslation(it)
        })
        binding.nativeWordEditText.addTextChangedListener(AfterTextChangedWatcher { binding.nativeWordLayout.error = null })

        observe(viewModel.validationLiveData) {
            if (it.wordForeignState is ValidationResult.Error) {
                binding.foreignWordLayout.error = it.wordForeignState.message
            }
            if (it.wordNativeState is ValidationResult.Error) {
                binding.nativeWordLayout.error = it.wordNativeState.message
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
        binding.foreignWordEditText.setText(wordTranslation.wordForeign)
        binding.nativeWordEditText.setText(wordTranslation.wordNative)
    }
}
