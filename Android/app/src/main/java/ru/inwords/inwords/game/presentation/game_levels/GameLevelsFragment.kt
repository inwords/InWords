package ru.inwords.inwords.game.presentation.game_levels

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.navigation.fragment.navArgs
import androidx.recyclerview.widget.GridLayoutManager
import com.facebook.imagepipeline.request.ImageRequestBuilder
import kotlinx.android.synthetic.main.fragment_game_levels.view.*
import kotlinx.android.synthetic.main.fragment_translation_main.*
import kotlinx.android.synthetic.main.game_welcome.view.*
import ru.inwords.inwords.R
import ru.inwords.inwords.core.recycler.fixOverscrollBehaviour
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.data.INVALID_ID
import ru.inwords.inwords.game.data.bean.GameLevelInfo
import ru.inwords.inwords.game.presentation.BaseContentFragment
import ru.inwords.inwords.game.presentation.OctoGameViewModelFactory
import ru.inwords.inwords.game.presentation.game_levels.recycler.GameLevelsAdapter
import ru.inwords.inwords.game.presentation.game_levels.recycler.applyDiffUtil

class GameLevelsFragment : BaseContentFragment<GameLevelInfo, GameLevelsViewModel, OctoGameViewModelFactory>() {
    override val layout = R.layout.fragment_game_levels
    override val classType = GameLevelsViewModel::class.java

    override val noContentViewId = R.id.levels_recycler

    private val args by navArgs<GameLevelsFragmentArgs>()

    private var gameId: Int = INVALID_ID
    private lateinit var adapter: GameLevelsAdapter

    private var shownIntro = false

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        return super.onCreateView(inflater, container, savedInstanceState).apply {
            adapter = GameLevelsAdapter { viewModel.navigateToGameLevel(it, gameId) }

            levels_recycler.layoutManager = GridLayoutManager(context, 3)
            levels_recycler.adapter = adapter

            if (!shownIntro) {
                showIntro(this)
                shownIntro = true
            }
        }
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setupWithNavController(toolbar)

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
            .doOnSubscribe { view.levels_recycler.showShimmerAdapter() }
            .doOnEach { view.levels_recycler.hideShimmerAdapter() }
            .subscribe({
                showScreenState(it.first)
                adapter.accept(it)

                fixOverscrollBehaviour(view.levels_recycler)
            }) {
                Log.e(javaClass.simpleName, it.message.orEmpty())
                showNoContent()
            }
            .disposeOnViewDestroyed()
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
