package com.dreamproject.inwords.data.source.webService;

import com.dreamproject.inwords.data.dto.EntityIdentificator;
import com.dreamproject.inwords.data.dto.User;
import com.dreamproject.inwords.data.dto.UserCredentials;
import com.dreamproject.inwords.data.dto.WordTranslation;
import com.dreamproject.inwords.data.dto.game.Game;
import com.dreamproject.inwords.data.dto.game.GameInfo;
import com.dreamproject.inwords.data.dto.game.GameLevel;
import com.dreamproject.inwords.data.dto.game.GameScore;
import com.dreamproject.inwords.data.dto.game.GameScoreRequest;
import com.dreamproject.inwords.data.source.webService.session.TokenResponse;
import com.dreamproject.inwords.data.sync.PullWordsAnswer;

import java.util.List;

import io.reactivex.Maybe;
import io.reactivex.Single;

public interface WebRequestsManager {
    Single<TokenResponse> getToken(UserCredentials userCredentials);

    Single<TokenResponse> registerUser(UserCredentials userCredentials);

    Single<String> getLogin();

    Single<User> getAuthorisedUser();

    Single<User> getUserById(int id);

    Maybe<List<WordTranslation>> getAllWords();

    Single<WordTranslation> insertWord(WordTranslation wordTranslation);

    Single<List<EntityIdentificator>> insertAllWords(List<WordTranslation> wordTranslations);

    Single<Integer> removeAllServerIds(List<Integer> serverIds);

    Single<PullWordsAnswer> pullWords(List<Integer> serverIds);

    Single<List<GameInfo>> getGameInfos();

    Single<Game> getGame(int gameId);

    Single<GameLevel> getLevel(int levelId);

    Single<GameScore> getScore(GameScoreRequest gameScoreRequest);
}
