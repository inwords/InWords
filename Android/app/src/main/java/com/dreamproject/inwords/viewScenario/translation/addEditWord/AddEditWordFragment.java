package com.dreamproject.inwords.viewScenario.translation.addEditWord;


import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.View;
import android.widget.EditText;

import com.dreamproject.inwords.Event;
import com.dreamproject.inwords.R;
import com.dreamproject.inwords.data.entity.WordTranslation;
import com.dreamproject.inwords.viewScenario.FragmentWithViewModelAndNav;
import com.jakewharton.rxbinding2.view.RxView;

import java.util.Random;

import io.reactivex.Observable;

/**
 * A simple {@link Fragment} subclass.
 */
public class AddEditWordFragment extends FragmentWithViewModelAndNav<AddEditWordViewModel, AddEditWordViewModelFactory> {
    boolean isEditing;
    EditText editTextNativeWord;
    EditText editTextForeignWord;

    WordTranslation wordToEdit;

    public AddEditWordFragment() {
        // Required empty public constructor
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        wordToEdit = null;

        if (getArguments() != null)
            wordToEdit = (WordTranslation) getArguments()
                    .getSerializable(WordTranslation.class.getCanonicalName());
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        editTextNativeWord = view.findViewById(R.id.editTextNativeWord);
        editTextForeignWord = view.findViewById(R.id.editTextForeignWord);

        setUpViewState();

        viewModel.getAddEditDoneLiveData().observe(this, this::popBackToTranslationMain);

        onDoneClickedHandler(RxView.clicks(view.findViewById(R.id.buttonConfirm)));
    }

    private void setUpViewState() {
        if (wordToEdit == null) {
            isEditing = false;

            Random rnd = new Random(System.currentTimeMillis());
            WordTranslation wordTranslation = new WordTranslation(0, 0, "fromfab", "от фаб" + rnd.nextInt(1000));

            editTextNativeWord.setText(wordTranslation.getWordNative());
            editTextForeignWord.setText(wordTranslation.getWordForeign());
        } else {
            isEditing = true;
            //textView.setText("Надо редактировать слово");
        }
    }

    private void popBackToTranslationMain(Event<Boolean> booleanEvent) {
        if (booleanEvent != null && booleanEvent.handle()) {
            navController.navigate(R.id.action_addEditWordFragment_to_translationMainFragment_pop);
        }
    }

    private void onDoneClickedHandler(Observable<Object> buttonDoneObservable) {
        if (isEditing)
            viewModel.onEditWordDoneHandler(buttonDoneObservable, getWord(), wordToEdit);
        else
            viewModel.onAddWordDoneHandler(buttonDoneObservable, getWord());
    }

    protected Observable<WordTranslation> getWord() { //TODO: validate input
        return Observable.zip(
                Observable.fromCallable(() -> editTextForeignWord.getText().toString()),
                Observable.fromCallable(() -> editTextNativeWord.getText().toString()),
                WordTranslation::new);
    }

    @Override
    protected int getLayout() {
        return R.layout.fragment_add_edit_word;
    }

    @NonNull
    @Override
    protected Class<AddEditWordViewModel> getClassType() {
        return AddEditWordViewModel.class;
    }
}
