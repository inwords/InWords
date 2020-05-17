package ru.inwords.inwords.profile.converter

import ru.inwords.inwords.core.BaseResourceOneWayConverter
import ru.inwords.inwords.profile.data.entity.ProfileEntity
import ru.inwords.inwords.proto.profile.ProfileReply

class ProfileReplyConverter : BaseResourceOneWayConverter<ProfileReply, ProfileEntity>() {
    override fun convert(source: ProfileReply): ProfileEntity {
        return ProfileEntity(
            userId = source.userId,
            nickName = source.nickName,
            avatarPath = if (source.avatarPath.isBlank()) null else source.avatarPath,
            experience = source.experience,
            lastLogin = source.lastLogin,
            role = source.role,
            registrationDate = source.registrationDate,
            email = source.email
        )
    }
}