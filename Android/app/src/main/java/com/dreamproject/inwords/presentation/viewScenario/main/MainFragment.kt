package com.dreamproject.inwords.presentation.viewScenario.main

import android.net.Uri
import android.os.Bundle
import android.view.View
import androidx.navigation.Navigation
import com.dreamproject.inwords.R
import com.dreamproject.inwords.core.util.SchedulersFacade
import com.dreamproject.inwords.data.dto.User
import com.dreamproject.inwords.data.dto.noUser
import com.dreamproject.inwords.presentation.viewScenario.FragmentWithViewModelAndNav
import com.facebook.imagepipeline.request.ImageRequestBuilder
import com.jakewharton.rxbinding2.view.RxView
import io.reactivex.disposables.Disposable
import kotlinx.android.synthetic.main.card_dictionary.view.*
import kotlinx.android.synthetic.main.card_profile.view.*
import kotlinx.android.synthetic.main.fragment_home.*

class MainFragment : FragmentWithViewModelAndNav<MainViewModel, MainViewModelFactory>() {
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

//TODO это не дело. перенести навигацию в модель. но это пока костыль
        viewModel.onGetAllHandler(RxView.clicks(buttonGetWordList))

        compositeDisposable.add(subscribeProfile())
        compositeDisposable.add(subscribeDictionary())
        //BottomNavigationView navigation = getActivity().findViewById(R.id.navigation);
        //viewModel.navigationItemSelectionHandler(RxBottomNavigationView.itemSelections(navigation));
    }

    private fun toLoginClickListener() = Navigation
            .createNavigateOnClickListener(R.id.action_mainFragment_to_loginFragment, null)

    private fun subscribeProfile(): Disposable {
        fun showProfile() {
            profile.avatar.visibility = View.VISIBLE
            profile.experience.visibility = View.VISIBLE
            profile.name.visibility = View.VISIBLE
            profile.clickToLogin.visibility = View.GONE

            profile.setOnClickListener(toLoginClickListener()) //TODO show profile listener here
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

        fun renderSuccess(user: User) {
            if (user.userId == noUser.userId) {
                renderNoUser()
            } else {
                renderUser(user)
            }

            profile.visibility = View.VISIBLE
        }

        fun renderLoading() {
            val loadingText = getString(R.string.loading_text_placeholder)
            profile.name.text = loadingText
            profile.experience.text = loadingText

            showProfile()
        }

        return viewModel.profileDataSubject
                .observeOn(SchedulersFacade.ui())
                .doOnSubscribe { renderLoading() }
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

    override fun getLayout(): Int {
        return R.layout.fragment_home
    }

    override fun getClassType(): Class<MainViewModel> {
        return MainViewModel::class.java
    }
}
