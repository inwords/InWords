package com.dreamproject.inwords.presentation.viewScenario.main

import android.os.Bundle
import android.view.View
import androidx.navigation.Navigation
import com.dreamproject.inwords.R
import com.dreamproject.inwords.core.util.SchedulersFacade
import com.dreamproject.inwords.presentation.viewScenario.FragmentWithViewModelAndNav
import com.jakewharton.rxbinding2.view.RxView
import io.reactivex.disposables.CompositeDisposable
import kotlinx.android.synthetic.main.fragment_home.*
import kotlinx.android.synthetic.main.profile.*

class MainFragment : FragmentWithViewModelAndNav<MainViewModel, MainViewModelFactory>() {
    private val compositeDisposable = CompositeDisposable()
    private var profileValid: Boolean = false

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        buttonGoLogin.setOnClickListener(
                Navigation.createNavigateOnClickListener(R.id.action_mainFragment_to_loginFragment, null))
//TODO это не дело. перенести навигацию в модель. но это пока костыль
        viewModel.onGetAllHandler(RxView.clicks(buttonGetWordList))

        if (!profileValid) {
            compositeDisposable.add(viewModel.profileDataSubject
                    .observeOn(SchedulersFacade.ui())
                    .subscribe({ u ->
                        profileValid = true
                        dictSize.text = "В вашем словаре 228 слов"
                        name.text = u.userName
                    }) {
                        name.text = "Не удалось загрузить данные"
                        dictSize.text = "Не удалось загрузить данные"
                    })
        }

        //BottomNavigationView navigation = getActivity().findViewById(R.id.navigation);
        //viewModel.navigationItemSelectionHandler(RxBottomNavigationView.itemSelections(navigation));
    }

    override fun onDestroyView() {
        super.onDestroyView()

        compositeDisposable.clear()
    }

    override fun getLayout(): Int {
        return R.layout.fragment_home
    }

    override fun getClassType(): Class<MainViewModel> {
        return MainViewModel::class.java
    }
}
