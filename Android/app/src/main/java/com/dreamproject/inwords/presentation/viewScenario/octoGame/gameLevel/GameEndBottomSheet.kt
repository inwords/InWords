package com.dreamproject.inwords.presentation.viewScenario.octoGame.gameLevel

import android.content.Context
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.view.ContextThemeWrapper
import androidx.lifecycle.ViewModelProviders
import com.dreamproject.inwords.R
import com.google.android.material.bottomsheet.BottomSheetDialogFragment
import io.reactivex.disposables.CompositeDisposable
import kotlinx.android.synthetic.main.game_end.*
import javax.inject.Inject

class GameEndBottomSheet : BottomSheetDialogFragment() {
    val compositeDisposable = CompositeDisposable()

    @Inject
    internal lateinit var modelFactory: GameLevelViewModelFactory
    private lateinit var viewModel: GameLevelViewModel

    override fun onAttach(context: Context?) {
        super.onAttach(context)
        viewModel = ViewModelProviders.of(parentFragment!!, modelFactory).get(GameLevelViewModel::class.java)
    }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        val contextThemeWrapper = ContextThemeWrapper(activity, R.style.AppTheme) // your app theme here
        return inflater.cloneInContext(contextThemeWrapper).inflate(R.layout.game_end, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        button_home.setOnClickListener { viewModel.onNewNavCommand(FromGameEndPaths.HOME) }
        button_next.setOnClickListener { viewModel.onNewNavCommand(FromGameEndPaths.NEXT) }
        button_back.setOnClickListener { viewModel.onNewNavCommand(FromGameEndPaths.BACK) }
    }

    override fun onDetach() {
        compositeDisposable.dispose()
        super.onDetach()
    }
}
