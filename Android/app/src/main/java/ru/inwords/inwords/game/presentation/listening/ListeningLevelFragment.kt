package ru.inwords.inwords.game.presentation.listening

import android.content.res.ColorStateList
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.content.res.ResourcesCompat
import androidx.core.os.bundleOf
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.navArgs
import com.google.android.material.button.MaterialButton
import ru.inwords.inwords.R
import ru.inwords.inwords.core.utils.scaleText
import ru.inwords.inwords.databinding.FragmentListeningLevelBinding
import ru.inwords.inwords.game.domain.UsersChoice
import ru.inwords.inwords.game.domain.model.WordModel
import ru.inwords.inwords.game.presentation.WordsSetsViewModelFactory
import ru.inwords.inwords.presentation.view_scenario.FragmentWithBinding
import javax.inject.Inject

class ListeningLevelFragment private constructor() : FragmentWithBinding<FragmentListeningLevelBinding>() {
    override val layout = R.layout.fragment_listening_level

    override fun bindingInflate(inflater: LayoutInflater, container: ViewGroup?, attachToRoot: Boolean): FragmentListeningLevelBinding {
        return FragmentListeningLevelBinding.inflate(inflater, container, attachToRoot)
    }

    @Inject
    lateinit var modelFactory: WordsSetsViewModelFactory

    private val viewModel: ListeningLevelViewModel by viewModels { modelFactory }

    private val args: ListeningLevelFragmentArgs by navArgs()

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding.speakerView.setOnClickListener {
            setResultTtsWord(args.listeningLevelData.ttsWord)
        }

        val listeningLevelData = args.listeningLevelData

        val variants = listOf(listeningLevelData.correctWord, listeningLevelData.incorrectWord).shuffled()
        val scaleText = viewModel.scaleText
        configureButton(binding.variantFirstButton, variants[0], scaleText)
        configureButton(binding.variantSecondButton, variants[1], scaleText)

        val buttonListener = View.OnClickListener { v ->
            val colorRes = if (v.tag == listeningLevelData.correctWord) R.color.green_complete else R.color.red_error

            (v as MaterialButton).backgroundTintList = ColorStateList.valueOf(
                ResourcesCompat.getColor(resources, colorRes, v.context.theme)
            )

            binding.variantFirstButton.setOnClickListener(null)
            binding.variantSecondButton.setOnClickListener(null)

            setResultWordChosen(UsersChoice(listeningLevelData, v.tag as WordModel))
        }

        binding.variantFirstButton.setOnClickListener(buttonListener)
        binding.variantSecondButton.setOnClickListener(buttonListener)

    }

    override fun onResume() {
        super.onResume()
        setResultTtsWord(args.listeningLevelData.ttsWord)
    }

    private fun setResultWordChosen(usersChoice: UsersChoice) {
        parentFragmentManager.setFragmentResult(LISTENING_LEVEL_RESULT_WORD_CHOSEN_KEY, bundleOf(USERS_CHOICE_KEY to usersChoice))
    }

    private fun setResultTtsWord(ttsWord: WordModel) {
        parentFragmentManager.setFragmentResult(LISTENING_LEVEL_RESULT_TTS_CLICKED_KEY, bundleOf(WORD_MODEL_KEY to ttsWord))
    }

    private fun configureButton(button: MaterialButton, wordModel: WordModel, scaleText: Boolean) {
        button.text = wordModel.word
        button.tag = wordModel

        if (scaleText) {
            scaleText(button)
        }
    }

    private fun scaleText(materialButton: MaterialButton) {
        materialButton.scaleText(20, 32)
    }

    companion object {
        fun newInstance(args: ListeningLevelFragmentArgs): ListeningLevelFragment {
            return ListeningLevelFragment().apply {
                arguments = args.toBundle()
            }
        }
    }
}