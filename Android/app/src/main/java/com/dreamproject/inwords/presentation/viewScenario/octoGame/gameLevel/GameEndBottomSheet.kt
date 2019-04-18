package com.dreamproject.inwords.presentation.viewScenario.octoGame.gameLevel

import android.content.Context
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.view.ContextThemeWrapper
import androidx.lifecycle.ViewModelProviders
import com.dreamproject.inwords.R
import com.dreamproject.inwords.presentation.viewScenario.octoGame.OctoGameViewModelFactory
import com.google.android.material.bottomsheet.BottomSheetDialogFragment
import io.reactivex.disposables.CompositeDisposable
import kotlinx.android.synthetic.main.game_end.*
import javax.inject.Inject

class GameEndBottomSheet : BottomSheetDialogFragment() {
    val compositeDisposable = CompositeDisposable()

    @Inject
    internal lateinit var modelFactory: OctoGameViewModelFactory
    private lateinit var viewModel: GameLevelViewModel

    override fun onAttach(context: Context?) {
        super.onAttach(context)
        viewModel = ViewModelProviders.of(parentFragment!!, modelFactory).get(GameLevelViewModel::class.java)
    }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        val contextThemeWrapper = ContextThemeWrapper(activity, R.style.AppTheme) //needed to render this dialog with correct theme
        return inflater.cloneInContext(contextThemeWrapper).inflate(R.layout.game_end, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        button_home.setOnClickListener { viewModel.onNewNavCommand(FromGameEndPathsEnum.HOME) }
        button_next.setOnClickListener { viewModel.onNewNavCommand(FromGameEndPathsEnum.NEXT) }
        button_back.setOnClickListener { viewModel.onNewNavCommand(FromGameEndPathsEnum.BACK) }
    }

    override fun onDetach() {
        compositeDisposable.dispose()
        super.onDetach()
    }
}
