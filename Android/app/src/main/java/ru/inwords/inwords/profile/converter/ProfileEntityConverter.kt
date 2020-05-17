package ru.inwords.inwords.profile.converter

import ru.inwords.inwords.core.BaseResourceTwoWayConverter
import ru.inwords.inwords.core.instantToStringDefault
import ru.inwords.inwords.core.parseInstantDefault
import ru.inwords.inwords.profile.data.entity.ProfileEntity
import ru.inwords.inwords.profile.domain.model.Profile

class ProfileEntityConverter : BaseResourceTwoWayConverter<ProfileEntity, Profile>() {
    override fun convert(source: ProfileEntity): Profile {
        return Profile(
            userId = source.userId,
            nickName = source.nickName,
            avatarPath = source.avatarPath,
            experience = source.experience,
            lastLogin = parseInstantDefault(source.lastLogin),
            role = source.role,
            registrationDate = parseInstantDefault(source.registrationDate),
            email = source.email
        )
    }

    override fun reverse(source: Profile): ProfileEntity {
        return ProfileEntity(
            userId = source.userId,
            nickName = source.nickName,
            avatarPath = source.avatarPath,
            experience = source.experience,
            lastLogin = source.lastLogin?.let { instantToStringDefault(it) }.orEmpty(),
            role = source.role,
            registrationDate = source.registrationDate?.let { instantToStringDefault(it) }.orEmpty(),
            email = source.email
        )
    }
}