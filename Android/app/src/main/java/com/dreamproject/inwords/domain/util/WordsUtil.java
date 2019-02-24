package com.dreamproject.inwords.domain.util;

import com.dreamproject.inwords.data.dto.EntityIdentificator;

import java.util.ArrayList;
import java.util.List;

public class WordsUtil {
    public static List<Integer> serverIdsFromWordTranslations(List<? extends EntityIdentificator> wordIdentificators) {
        List<Integer> serverIds = new ArrayList<>();

        for (EntityIdentificator wordTranslation : wordIdentificators) {
            serverIds.add(wordTranslation.getServerId());
        }

        return serverIds;
    }

    public static List<Integer> absList(List<Integer> integers) {
        {
            List<Integer> adsServerIds = new ArrayList<>(integers.size());

            for (int i = 0, serverIdsSize = integers.size(); i < serverIdsSize; i++) {
                adsServerIds.add(Math.abs(integers.get(i)));
            }
            return adsServerIds;
        }
    }
}
