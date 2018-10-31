package com.dreamproject.inwords.viewScenario.translation.addEditWord;


import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.View;
import android.widget.TextView;

import com.dreamproject.inwords.Event;
import com.dreamproject.inwords.R;
import com.dreamproject.inwords.data.entity.WordTranslation;
import com.dreamproject.inwords.viewScenario.FragmentWithViewModelAndNav;
import com.dreamproject.inwords.viewScenario.translation.TranslationViewModel;
import com.dreamproject.inwords.viewScenario.translation.TranslationViewModelFactory;

import java.util.Random;

/**
 * A simple {@link Fragment} subclass.
 */
public class AddEditWordFragment extends FragmentWithViewModelAndNav<TranslationViewModel, TranslationViewModelFactory> {
    public AddEditWordFragment() {
        // Required empty public constructor
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        TextView textView = view.findViewById(R.id.tvwordtr);

        Event<WordTranslation> event = viewModel.getAddEditWordLiveData().getValue();
        if (event != null) {
            if (event.peekContent() == null) {
                Random rnd = new Random(System.currentTimeMillis());
                WordTranslation wordTranslation = new WordTranslation(0, 0, "fromfab", "от фаб" + rnd.nextInt(1000));
                viewModel.onAddWordTranslation(wordTranslation);

                textView.setText("Добавлено слово: " + wordTranslation);
            }
            else{
                textView.setText("Надо редактировать слово");
            }
        }
    }

    @Override
    protected int getLayout() {
        return R.layout.fragment_add_edit_word;
    }

    @NonNull
    @Override
    protected Class<TranslationViewModel> getClassType() {
        return TranslationViewModel.class;
    }
}
