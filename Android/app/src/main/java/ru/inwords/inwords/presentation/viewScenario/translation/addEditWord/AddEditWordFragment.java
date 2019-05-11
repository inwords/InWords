package ru.inwords.inwords.presentation.viewScenario.translation.addEditWord;


import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.jakewharton.rxbinding2.view.RxView;

import java.util.Random;

import io.reactivex.Observable;
import ru.inwords.inwords.R;
import ru.inwords.inwords.core.util.Event;
import ru.inwords.inwords.data.dto.WordTranslation;
import ru.inwords.inwords.presentation.viewScenario.FragmentWithViewModelAndNav;
import ru.inwords.inwords.presentation.viewScenario.translation.TranslationViewModelFactory;

public class AddEditWordFragment extends FragmentWithViewModelAndNav<AddEditWordViewModel, TranslationViewModelFactory> {
    private boolean isEditing;
    private EditText editTextNativeWord;
    private EditText editTextForeignWord;
    private Button buttonConfirm;

    private WordTranslation wordToEdit;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        wordToEdit = null;

        if (getArguments() != null) {
            wordToEdit = (WordTranslation) getArguments()
                    .getSerializable(WordTranslation.class.getCanonicalName());
        }
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        editTextNativeWord = view.findViewById(R.id.editTextNativeWord);
        editTextForeignWord = view.findViewById(R.id.editTextForeignWord);
        buttonConfirm = view.findViewById(R.id.buttonConfirm);

        setUpViewState();

        viewModel.getAddEditDoneLiveData().observe(this, this::popBackToTranslationMain);

        onDoneClickedHandler(RxView.clicks(buttonConfirm));
    }

    private void setUpViewState() {
        if (wordToEdit == null) {
            isEditing = false;

            buttonConfirm.setText("Добавить"); //TODO not to hardcode

            Random rnd = new Random(System.currentTimeMillis());
            WordTranslation wordTranslation = new WordTranslation(0, 0, "fromfab", "от фаб" + rnd.nextInt(1000));

            renderEditingWords(wordTranslation);
        } else {
            isEditing = true;

            buttonConfirm.setText("Изменить"); //TODO not to hardcode

            renderEditingWords(wordToEdit);
        }
    }

    private void renderEditingWords(WordTranslation wordTranslation) {
        editTextNativeWord.setText(wordTranslation.getWordNative());
        editTextForeignWord.setText(wordTranslation.getWordForeign());
    }

    private void popBackToTranslationMain(Event<Boolean> booleanEvent) {
        if (booleanEvent != null && booleanEvent.handle()) {
            navController.navigate(R.id.action_addEditWordFragment_pop);
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
