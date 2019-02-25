package com.dreamproject.inwords.dagger;

import com.dreamproject.inwords.data.source.database.RoomTypeConverter;

import dagger.Subcomponent;

@Subcomponent
public interface GsonSubcomponent {
    void inject(RoomTypeConverter roomTypeConverter);

    @Subcomponent.Builder
    interface Builder {
        GsonSubcomponent build();
    }
}
