package ru.inwords.inwords.game.presentation.game_level

import android.content.Context
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.view.ContextThemeWrapper
import androidx.core.os.bundleOf
import androidx.fragment.app.viewModels
import androidx.navigation.NavController
import androidx.navigation.fragment.findNavController
import androidx.navigation.fragment.navArgs
import com.google.android.material.bottomsheet.BottomSheetDialogFragment
import dagger.android.support.AndroidSupportInjection
import io.reactivex.disposables.CompositeDisposable
import ru.inwords.inwords.R
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.core.utils.observe
import ru.inwords.inwords.databinding.GameEndBinding
import ru.inwords.inwords.game.domain.model.TrainingScore
import ru.inwords.inwords.game.presentation.WordsSetsViewModelFactory
import ru.inwords.inwords.main_activity.data.validId
import javax.inject.Inject

class GameEndBottomSheet : BottomSheetDialogFragment() {
    private val args by navArgs<GameEndBottomSheetArgs>()

    private val compositeDisposable = CompositeDisposable()

    @Inject
    internal lateinit var modelFactory: WordsSetsViewModelFactory
    private val viewModel: GameEndViewModel by viewModels { modelFactory }

    private lateinit var navController: NavController

    private lateinit var binding: GameEndBinding

    override fun onAttach(context: Context) {
        super.onAttach(context)
        AndroidSupportInjection.inject(this)
    }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        val contextThemeWrapper = ContextThemeWrapper(activity, R.style.AppTheme) //needed to render this dialog with correct theme
        binding = GameEndBinding.inflate(inflater.cloneInContext(contextThemeWrapper), container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        navController = findNavController()

        observe(viewModel.navigateTo) {
            it.perform(navController)
        }

        compositeDisposable.add(
            viewModel.getScore(args.game, args.trainingMetric)
                .toObservable()
                .startWith(Resource.Loading())
                .observeOn(SchedulersFacade.ui())
                .subscribe({
                    Log.d(TAG, it.toString())

                    when (it) {
                        is Resource.Success -> showSuccess(it.data)
                        is Resource.Loading -> showLoading()
                        is Resource.Error -> showError()
                    }
                }, {
                    Log.e(TAG, it.message.orEmpty())
                })
        )

        setupView()
    }

    override fun onDetach() {
        compositeDisposable.dispose()
        super.onDetach()
    }

    private fun setupView() {
        fun setResultClickedButton(clickedButton: ClickedButton) {
            parentFragmentManager.setFragmentResult(GAME_END_RESULT_KEY, bundleOf(CLICKED_BUTTON_KEY to clickedButton))
        }

        binding.buttonHome.setOnClickListener {
            viewModel.onHomeButtonClicked()
            setResultClickedButton(ClickedButton.BUTTON_HOME)
        }
        binding.buttonBack.setOnClickListener {
            viewModel.onBackButtonClicked()
            setResultClickedButton(ClickedButton.BUTTON_BACK)
        }
        binding.buttonNext.setOnClickListener {
            viewModel.onNextButtonClicked()
            setResultClickedButton(ClickedButton.BUTTON_NEXT)
        }
        binding.buttonRetry.setOnClickListener {
            viewModel.onRetryButtonCLicked()
            setResultClickedButton(ClickedButton.BUTTON_RETRY)
        }
    }

    private fun showSuccess(trainingScore: TrainingScore) {
        if (trainingScore.levelId == args.trainingMetric.levelId || !validId(args.trainingMetric.levelId)) {
            binding.ratingBar.rating = trainingScore.score.toFloat() / 2
            binding.ratingBar.visibility = View.VISIBLE
            binding.ratingLoadingProgress.visibility = View.INVISIBLE
            binding.ratingNotLoaded.visibility = View.INVISIBLE
        }
    }

    private fun showLoading() {
        binding.ratingBar.visibility = View.INVISIBLE
        binding.ratingLoadingProgress.visibility = View.VISIBLE
        binding.ratingNotLoaded.visibility = View.INVISIBLE
    }

    private fun showError() {
        binding.ratingBar.visibility = View.INVISIBLE
        binding.ratingLoadingProgress.visibility = View.INVISIBLE
        binding.ratingNotLoaded.visibility = View.VISIBLE
    }

    companion object {
        const val TAG = "GameEndBottomSheet"
    }
}
