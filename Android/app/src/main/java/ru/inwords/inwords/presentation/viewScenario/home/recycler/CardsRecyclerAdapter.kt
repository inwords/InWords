package ru.inwords.inwords.presentation.viewScenario.home.recycler

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import io.reactivex.subjects.Subject
import ru.inwords.inwords.R
import ru.inwords.inwords.presentation.viewScenario.octoGame.BaseSingleTypeAdapter

class CardsRecyclerAdapter(
        layoutInflater: LayoutInflater,
        onItemClickListener: Subject<CardWrapper>
) : BaseSingleTypeAdapter<CardWrapper, RecyclerView.ViewHolder>(layoutInflater, onItemClickListener) {

    enum class CardTypes {
        CREATE_ACCOUNT, PROFILE_LOADING, PROFILE, DICTIONARY
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        return when (viewType) {
            CardTypes.CREATE_ACCOUNT.ordinal -> CreateAccountViewHolder(
                    layoutInflater.inflate(R.layout.card_create_account, parent, false),
                    onItemClickListener
            )
            CardTypes.PROFILE_LOADING.ordinal -> ProfileLoadingViewHolder(
                    layoutInflater.inflate(R.layout.card_profile_shimmer, parent, false),
                    onItemClickListener
            )
            CardTypes.PROFILE.ordinal -> ProfileViewHolder(
                    layoutInflater.inflate(R.layout.card_profile, parent, false),
                    onItemClickListener
            )
            CardTypes.DICTIONARY.ordinal -> DictionaryViewHolder(
                    layoutInflater.inflate(R.layout.card_dictionary, parent, false),
                    onItemClickListener
            )

            else -> throw IllegalArgumentException("ViewHolder of that type is not supported")
        }
    }

    override fun getItemViewType(position: Int): Int {
        return when (items[position]) {
            is CardWrapper.CreateAccountMarker -> CardTypes.CREATE_ACCOUNT.ordinal
            is CardWrapper.ProfileLoadingMarker -> CardTypes.PROFILE_LOADING.ordinal
            is CardWrapper.ProfileModel -> CardTypes.PROFILE.ordinal
            is CardWrapper.DictionaryModel -> CardTypes.DICTIONARY.ordinal
        }
    }

    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
        return when (val item = items[position]) {
            is CardWrapper.CreateAccountMarker -> (holder as CreateAccountViewHolder).bind(item)
            is CardWrapper.ProfileLoadingMarker -> (holder as ProfileLoadingViewHolder).bind(item)
            is CardWrapper.ProfileModel -> (holder as ProfileViewHolder).bind(item)
            is CardWrapper.DictionaryModel -> (holder as DictionaryViewHolder).bind(item)
        }
    }
}