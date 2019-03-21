package com.dreamproject.inwords.presentation.viewScenario.main

import android.net.Uri
import android.os.Bundle
import android.view.View
import androidx.navigation.Navigation
import com.dreamproject.inwords.R
import com.dreamproject.inwords.core.util.SchedulersFacade
import com.dreamproject.inwords.presentation.viewScenario.FragmentWithViewModelAndNav
import com.facebook.imagepipeline.request.ImageRequestBuilder
import com.jakewharton.rxbinding2.view.RxView
import io.reactivex.Observable
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.disposables.Disposable
import kotlinx.android.synthetic.main.card_dictionary.view.*
import kotlinx.android.synthetic.main.card_profile.view.*
import kotlinx.android.synthetic.main.fragment_home.*

class MainFragment : FragmentWithViewModelAndNav<MainViewModel, MainViewModelFactory>() {
    private val compositeDisposable = CompositeDisposable()

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        buttonGoLogin.setOnClickListener(
                Navigation.createNavigateOnClickListener(R.id.action_mainFragment_to_loginFragment, null))
//TODO это не дело. перенести навигацию в модель. но это пока костыль
        viewModel.onGetAllHandler(RxView.clicks(buttonGetWordList))

        compositeDisposable.add(subscribeProfile())
        compositeDisposable.add(subscribeDictionary())
        //BottomNavigationView navigation = getActivity().findViewById(R.id.navigation);
        //viewModel.navigationItemSelectionHandler(RxBottomNavigationView.itemSelections(navigation));
    }

    override fun onDestroyView() {
        super.onDestroyView()

        compositeDisposable.clear()
    }

    private fun subscribeProfile(): Disposable {
        return viewModel.profileDataSubject
                .observeOn(SchedulersFacade.ui())
                .subscribe({ u ->
                    if (u.avatar != null) {
                        val request = ImageRequestBuilder.newBuilderWithSource(Uri.parse(u.avatar))
                                .setLocalThumbnailPreviewsEnabled(true)
                                .build()

                        profile.avatar.setImageRequest(request)
                    }

                    profile.experience.text = getString(R.string.user_experience, 228)
                    profile.name.text = u.userName
                }) {
                    val errorText = getString(R.string.error_text_placeholder)
                    profile.name.text = errorText
                    profile.experience.text = errorText
                }
    }

    private fun subscribeDictionary(): Disposable {
        return Observable.just(0)
                .observeOn(SchedulersFacade.ui())
                .subscribe({ u ->
                    dictionary.setOnClickListener { navController.navigate(R.id.action_mainFragment_to_translationMainFragment) }
                    dictionary.dict.setImageResource(R.drawable.ic_dictionary)

                    dictionary.dictSize.text = getString(R.string.words_in_dictionary, 228)
                    dictionary.title.text = "Ваш словарь"
                }) {
                    val errorText = getString(R.string.error_text_placeholder)
                    dictionary.title.text = errorText
                    dictionary.dictSize.text = errorText
                }
    }

    override fun getLayout(): Int {
        return R.layout.fragment_home
    }

    override fun getClassType(): Class<MainViewModel> {
        return MainViewModel::class.java
    }
}
