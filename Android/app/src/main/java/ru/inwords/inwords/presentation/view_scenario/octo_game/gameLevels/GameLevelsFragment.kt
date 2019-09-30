package ru.inwords.inwords.presentation.view_scenario.octo_game.gameLevels

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.navigation.fragment.navArgs
import androidx.recyclerview.widget.GridLayoutManager
import com.facebook.imagepipeline.request.ImageRequestBuilder
import kotlinx.android.synthetic.main.fragment_game_levels.view.*
import kotlinx.android.synthetic.main.game_welcome.view.*
import ru.inwords.inwords.R
import ru.inwords.inwords.core.Resource
import ru.inwords.inwords.core.fixOverscrollBehaviour
import ru.inwords.inwords.core.util.SchedulersFacade
import ru.inwords.inwords.data.dto.game.GameLevelInfo
import ru.inwords.inwords.domain.util.INVALID_ID
import ru.inwords.inwords.presentation.view_scenario.octo_game.BaseContentFragment
import ru.inwords.inwords.presentation.view_scenario.octo_game.OctoGameViewModelFactory
import ru.inwords.inwords.presentation.view_scenario.octo_game.gameLevels.recycler.GameLevelsAdapter
import ru.inwords.inwords.presentation.view_scenario.octo_game.gameLevels.recycler.applyDiffUtil

class GameLevelsFragment : BaseContentFragment<GameLevelInfo, GameLevelsViewModel, OctoGameViewModelFactory>() {
    override val layout = R.layout.fragment_game_levels
    override val classType = GameLevelsViewModel::class.java

    private val args by navArgs<GameLevelsFragmentArgs>()

    private var gameId: Int = INVALID_ID
    private lateinit var adapter: GameLevelsAdapter

    private var shownIntro = false

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        return super.onCreateView(inflater, container, savedInstanceState).apply {
            adapter = GameLevelsAdapter(viewModel.navigateToGameLevel)

            levelsRecycler.layoutManager = GridLayoutManager(context, 3)
            levelsRecycler.adapter = adapter

            if (!shownIntro) {
                showIntro(this)
                shownIntro = true
            }
        }
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        viewModel.navigateToGameLevel.subscribe(::navigateToGameLevel).disposeOnViewDestroyed()

        viewModel.screenInfoStream(args.gameInfo.gameId)
                .map {
                    if (it is Resource.Success) {
                        gameId = it.data.game.gameId
                        it.data.game.gameLevelInfos
                    } else {
                        showNoContent()
                        emptyList() //TODO show error LUL
                    }
                }
                .applyDiffUtil()
                .observeOn(SchedulersFacade.ui())
                .doOnSubscribe { view.levelsRecycler.showShimmerAdapter() }
                .doOnEach { view.levelsRecycler.hideShimmerAdapter() }
                .subscribe({
                    showScreenState(it.first)
                    adapter.accept(it)

                    fixOverscrollBehaviour(view.levelsRecycler)
                }) {
                    Log.e(javaClass.simpleName, it.message.orEmpty())
                    showNoContent()
                }
                .disposeOnViewDestroyed()
    }

    private fun navigateToGameLevel(gameLevelInfo: GameLevelInfo) {
        navController.navigate(GameLevelsFragmentDirections.actionGameLevelsFragmentToGameLevelFragment(gameLevelInfo, gameId))
    }

    private fun showIntro(view: View) = with(view) {
        val imageRequest = ImageRequestBuilder
                .newBuilderWithResourceId(R.drawable.octopus_default)
                .build()

        welcome_image.setImageRequest(imageRequest)
        welcome_text.text = args.gameInfo.description
        welcome_screen.visibility = View.VISIBLE

        startButton.setOnClickListener {
            welcome_screen.animate()
                    .alpha(0f)
                    .withEndAction { welcome_screen?.visibility = View.GONE }
        }
    }
}
