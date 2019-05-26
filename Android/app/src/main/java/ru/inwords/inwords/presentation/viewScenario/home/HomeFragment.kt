package ru.inwords.inwords.presentation.viewScenario.home

import android.net.Uri
import android.os.Bundle
import android.view.View
import androidx.navigation.Navigation
import com.facebook.imagepipeline.request.ImageRequestBuilder
import io.reactivex.disposables.Disposable
import kotlinx.android.synthetic.main.card_dictionary.view.*
import kotlinx.android.synthetic.main.card_profile.view.*
import kotlinx.android.synthetic.main.fragment_home.*
import ru.inwords.inwords.R
import ru.inwords.inwords.core.util.SchedulersFacade
import ru.inwords.inwords.data.dto.User
import ru.inwords.inwords.domain.model.Resource
import ru.inwords.inwords.presentation.viewScenario.FragmentWithViewModelAndNav

class HomeFragment : FragmentWithViewModelAndNav<HomeViewModel, HomeViewModelFactory>() {
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        compositeDisposable.add(subscribePolicy())
        compositeDisposable.add(subscribeProfile())
        compositeDisposable.add(subscribeDictionary())
        //BottomNavigationView navigation = getActivity().findViewById(R.id.navigation);
        //viewModel.navigationItemSelectionHandler(RxBottomNavigationView.itemSelections(navigation));

//        cardsGameView.cardsData = CardsData(listOf(
//                WordTranslation("Home", "Дом"),
//                WordTranslation("Car", "Машина")
//        ))
    }

    private fun toLoginClickListener() = Navigation
            .createNavigateOnClickListener(R.id.action_mainFragment_to_loginFragment, null)

    private fun toProfileClickListener() = Navigation
            .createNavigateOnClickListener(R.id.action_mainFragment_to_profileFragment, null)

    private fun subscribeProfile(): Disposable {
        fun showProfile() {
            profile.avatar.visibility = View.VISIBLE
            profile.experience.visibility = View.VISIBLE
            profile.name.visibility = View.VISIBLE
            profile.clickToLogin.visibility = View.GONE

            profile.setOnClickListener(toProfileClickListener()) //TODO show profile listener here
        }

        fun showLoginHint() {
            profile.avatar.visibility = View.GONE
            profile.experience.visibility = View.GONE
            profile.name.visibility = View.GONE
            profile.clickToLogin.visibility = View.VISIBLE

            profile.setOnClickListener(toLoginClickListener())
        }

        fun renderUser(user: User) {
            if (user.avatar != null) {
                val request = ImageRequestBuilder.newBuilderWithSource(Uri.parse(user.avatar))
                        .setProgressiveRenderingEnabled(true)
                        .setLocalThumbnailPreviewsEnabled(true)
                        .build()

                profile.avatar.setImageRequest(request)
            } else {
                profile.avatar.setActualImageResource(R.drawable.ic_octopus1)
            }

            profile.experience.text = getString(R.string.user_experience, 15)
            profile.name.text = user.userName

            showProfile()
        }

        fun renderNoUser() {
            val hintText = getString(R.string.sign_up_proposal)
            profile.name.text = hintText
            profile.experience.text = "Войдите в аккаунт, чтобы использовать приложение по полной"

            showLoginHint()
        }

        fun renderSuccess(user: Resource<User>) {
            if (user.error()) {
                renderNoUser()
            } else if (user.success()) {
                renderUser(user.data!!)
            }//TODO loading state use

            profile_shimmer.stopShimmer()
            profile_shimmer.visibility = View.GONE
            profile.visibility = View.VISIBLE
        }

        fun renderLoading() {
            profile_shimmer.startShimmer()
            profile_shimmer.visibility = View.VISIBLE
            profile.visibility = View.GONE

            val loadingText = getString(R.string.loading_text_placeholder)
            profile.name.text = loadingText
            profile.experience.text = loadingText

            showProfile()
        }

        return viewModel.profileDataSubject
                .doOnSubscribe { renderLoading() }
                .observeOn(SchedulersFacade.ui())
                .subscribe(::renderSuccess)
    }

    private fun subscribeDictionary(): Disposable {
        fun applyListener() {
            dictionary.setOnClickListener { navController.navigate(R.id.action_mainFragment_to_translationMainFragment) }
        }

        fun renderCount(count: Int) {
            dictionary.dictSize.text = getString(R.string.words_in_dictionary, count)
        }

        fun renderError() {
            val errorText = getString(R.string.error_text_placeholder)
            dictionary.dictSize.text = errorText
        }

        return viewModel.wordsCountSubject
                .observeOn(SchedulersFacade.ui())
                .doOnSubscribe { applyListener() }
                .subscribe(::renderCount) { renderError() }
    }

    private fun subscribePolicy(): Disposable {
        return viewModel.getPolicyAgreementState()
                .subscribeOn(SchedulersFacade.io())
                .observeOn(SchedulersFacade.ui())
                .subscribe { agreed ->
                    if (!agreed && !isStateSaved) {
                        navController.navigate(R.id.action_mainFragment_to_policyFragment)
                    }
                }
    }

    override fun getLayout(): Int {
        return R.layout.fragment_home
    }

    override fun getClassType(): Class<HomeViewModel> {
        return HomeViewModel::class.java
    }
}
