package ru.inwords.inwords.profile.presentation.view

import android.content.Context
import android.os.Bundle
import android.os.Parcelable
import android.util.AttributeSet
import android.view.LayoutInflater
import android.view.View
import android.widget.FrameLayout
import ru.inwords.inwords.R
import ru.inwords.inwords.databinding.TextInputRemoteEditableFieldBinding

class TextInputRemoteEditableField @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0
) : FrameLayout(context, attrs, defStyleAttr) {

    private enum class State { DEFAULT, EDITING, EDITING_FROM_SCRATCH, LOADING, ERROR }

    private val binding: TextInputRemoteEditableFieldBinding

    private var editFromScratch: Boolean = false

    private var state: State = State.DEFAULT

    init {
        isSaveEnabled = true

        binding = TextInputRemoteEditableFieldBinding.inflate(LayoutInflater.from(context), this)

        attrs?.let {
            val typedArray = context.obtainStyledAttributes(it, R.styleable.TextInputRemoteEditableField, 0, 0)

            if (typedArray.hasValue(R.styleable.TextInputRemoteEditableField_hint)) {
                binding.textInputLayout.hint = typedArray.getString(R.styleable.TextInputRemoteEditableField_hint).orEmpty()
            }
            if (typedArray.hasValue(R.styleable.TextInputRemoteEditableField_text)) {
                binding.editText.setText(typedArray.getString(R.styleable.TextInputRemoteEditableField_text).orEmpty())
            }
            if (typedArray.hasValue(R.styleable.TextInputRemoteEditableField_editFromScratch)) {
                editFromScratch = typedArray.getBoolean(R.styleable.TextInputRemoteEditableField_editFromScratch, false)
            }
            if (typedArray.hasValue(R.styleable.TextInputRemoteEditableField_icon_start)) {
                binding.iconStart.background = typedArray.getDrawable(R.styleable.TextInputRemoteEditableField_icon_start)
            }

            typedArray.recycle()
        }

        binding.editButton.setOnClickListener {
            onEditClickListener?.invoke(it)
        }

        binding.applyButton.setOnClickListener {
            onApplyClickListener?.invoke(it)
        }

        binding.editProgress.id = View.generateViewId()
        binding.editButton.id = View.generateViewId()
        binding.applyButton.id = View.generateViewId()
        binding.textInputLayout.id = View.generateViewId()
        binding.editText.id = View.generateViewId()
        binding.iconStart.id = View.generateViewId()
    }

    var onEditClickListener: ((View) -> Unit)? = null
    var onApplyClickListener: ((View) -> Unit)? = null

    /**
     * Используется для возврата значения после [setEditingViewState]
     */
    var defaultValueProvider: (() -> String)? = null

    var text: String
        get() {
            return binding.editText.text?.toString().orEmpty()
        }
        set(value) {
            binding.editText.setText(value)
        }

    var editButtonEnabled: Boolean
        get() {
            return binding.editButton.isEnabled
        }
        set(value) {
            binding.editButton.isEnabled = value
        }

    fun setSelection(index: Int): Unit = binding.editText.setSelection(index)

    fun setDefaultViewState() {
        binding.editProgress.visibility = View.INVISIBLE
        binding.editButton.visibility = View.VISIBLE
        binding.applyButton.visibility = View.INVISIBLE
        binding.editText.isEnabled = false

        if (state == State.EDITING_FROM_SCRATCH) {
            defaultValueProvider?.invoke()?.let { text = it }
        }

        state = State.DEFAULT
    }

    fun setEditingViewState() {
        binding.editProgress.visibility = View.INVISIBLE
        binding.editButton.visibility = View.INVISIBLE
        binding.applyButton.visibility = View.VISIBLE
        binding.editText.isEnabled = true

        if (editFromScratch) {
            text = ""
            state = State.EDITING_FROM_SCRATCH
        } else {
            state = State.EDITING
        }
    }

    fun setLoadingViewState() {
        binding.editProgress.visibility = View.VISIBLE
        binding.editButton.visibility = View.INVISIBLE
        binding.applyButton.visibility = View.INVISIBLE
        binding.editText.isEnabled = false

        state = State.LOADING
    }

    fun setErrorViewState() {
        binding.editProgress.visibility = View.INVISIBLE
        binding.editButton.visibility = View.INVISIBLE
        binding.applyButton.visibility = View.VISIBLE
        binding.editText.isEnabled = true

        state = State.ERROR
    }



    override fun onSaveInstanceState(): Parcelable {
        val bundle = Bundle()

        bundle.putParcelable(SUPER_STATE, super.onSaveInstanceState())

        bundle.putInt(EDIT_PROGRESS_ID, binding.editProgress.id)
        bundle.putInt(EDIT_BUTTON_ID, binding.editButton.id)
        bundle.putInt(APPLY_BUTTON_ID, binding.applyButton.id)
        bundle.putInt(TEXT_INPUT_LAYOUT_ID, binding.textInputLayout.id)
        bundle.putInt(EDIT_TEXT_ID, binding.editText.id)
        bundle.putInt(ICON_START_ID, binding.iconStart.id)
        bundle.putSerializable(FIELD_STATE, state)

        return bundle
    }


    override fun onRestoreInstanceState(state: Parcelable?) {
        val parcelable = if (state is Bundle) {
            binding.editProgress.id = state.getInt(EDIT_PROGRESS_ID, View.NO_ID)
            binding.editButton.id = state.getInt(EDIT_BUTTON_ID, View.NO_ID)
            binding.applyButton.id = state.getInt(APPLY_BUTTON_ID, View.NO_ID)
            binding.textInputLayout.id = state.getInt(TEXT_INPUT_LAYOUT_ID, View.NO_ID)
            binding.editText.id = state.getInt(EDIT_TEXT_ID, View.NO_ID)
            binding.iconStart.id = state.getInt(ICON_START_ID, View.NO_ID)
            this.state = state.getSerializable(FIELD_STATE) as State

            state.getParcelable(SUPER_STATE)
        } else {
            state
        }

        super.onRestoreInstanceState(parcelable)
    }

    companion object {
        private const val SUPER_STATE = "SUPER_STATE"
        private const val EDIT_PROGRESS_ID = "EDIT_PROGRESS_ID"
        private const val EDIT_BUTTON_ID = "EDIT_BUTTON_ID"
        private const val APPLY_BUTTON_ID = "APPLY_BUTTON_ID"
        private const val TEXT_INPUT_LAYOUT_ID = "TEXT_INPUT_LAYOUT_ID"
        private const val EDIT_TEXT_ID = "EDIT_TEXT_ID"
        private const val ICON_START_ID = "ICON_START_ID"
        private const val FIELD_STATE = "FIELD_STATE"
    }
}