package ru.inwords.inwords.data.source.webService;

import java.util.List;

import io.reactivex.Single;
import ru.inwords.inwords.data.dto.EntityIdentificator;
import ru.inwords.inwords.data.dto.User;
import ru.inwords.inwords.data.dto.UserCredentials;
import ru.inwords.inwords.data.dto.WordTranslation;
import ru.inwords.inwords.data.dto.game.Game;
import ru.inwords.inwords.data.dto.game.GameInfo;
import ru.inwords.inwords.data.dto.game.GameLevel;
import ru.inwords.inwords.data.dto.game.LevelScore;
import ru.inwords.inwords.data.dto.game.LevelScoreRequest;
import ru.inwords.inwords.data.source.webService.session.TokenResponse;
import ru.inwords.inwords.data.sync.PullWordsAnswer;

public interface WebRequestsManager {
    Single<TokenResponse> getToken(UserCredentials userCredentials);

    Single<TokenResponse> registerUser(UserCredentials userCredentials);

    Single<String> getLogin();

    Single<User> getAuthorisedUser();

    Single<User> getUserById(int id);

    Single<List<EntityIdentificator>> insertAllWords(List<WordTranslation> wordTranslations);

    Single<Integer> removeAllServerIds(List<Integer> serverIds);

    Single<PullWordsAnswer> pullWords(List<Integer> serverIds);

    Single<List<GameInfo>> getGameInfos();

    Single<Game> getGame(int gameId);

    Single<GameLevel> getLevel(int levelId);

    Single<LevelScore> getScore(LevelScoreRequest levelScoreRequest);

    Single<Boolean> uploadScore(List<LevelScoreRequest> levelScoreRequests);
}
