package com.dreamproject.inwords;

public class BasicModelPresenter<Model> extends BasicPresenter {
    protected Model model;

    public BasicModelPresenter(Model model) {
        this.model = model;
    }
}
