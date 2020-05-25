using InWords.Data;
using InWords.Data.Creations.GameBox;
using InWords.Data.Enums;
using InWords.WebApi.Business.GameEvaluator.Game;
using InWords.WebApi.Business.GameEvaluator.Model;
using MimeKit.Encodings;
using System;
using System.Collections.Generic;
using System.Linq;

namespace InWords.WebApi.Modules.WordsSets.Extentions
{
    public static class DBUpdateScoreExtention
    {
        public static IEnumerable<UserGameLevel> AddOrUpdateUserGameLevel(
            this InWordsDataContext context,
            List<LevelScore> levelScores,
            int userId)
        {
            if (context == null)
                throw new ArgumentNullException(nameof(context));

            if (levelScores == null)
                return Array.Empty<UserGameLevel>();

            levelScores.AddRange(GetTotalScores(levelScores));

            // select all games
            var types = levelScores.Select(d => d.GameType).Distinct().ToArray();
            var levelIds = levelScores.Select(d => d.GameLevelId).Distinct().ToArray();
            var existedLevels = context.UserGameLevels
                .Where(u => u.UserId == userId)
                .Where(u => types.Contains(u.GameType))
                .Where(u => levelIds.Contains(u.GameLevelId));

            // find all users games
            var usersGames = from gameLevel in existedLevels
                             join usersGame in context.UserGameLevels.Where(s => s.UserId == userId)
                             on gameLevel.GameLevelId equals usersGame.GameLevelId into ug
                             from usersGame in ug.DefaultIfEmpty()
                             select new { gameLevel.GameLevelId, usersGame };

            // create if not exist
            Dictionary<(int, GameType), UserGameLevel> userGameLevels = new Dictionary<(int, GameType), UserGameLevel>();
            IList<UserGameLevel> corrupted = new List<UserGameLevel>();
            foreach (var ugame in usersGames)
            {
                if (ugame == null) continue;

                var currentUserGame = ugame.usersGame;
                var key = (ugame.GameLevelId, currentUserGame.GameType);
                if (userGameLevels.ContainsKey(key))
                {
                    if (userGameLevels[key].UserGameLevelId < currentUserGame.UserGameLevelId)
                    {
                        int maxScore = Math.Max(userGameLevels[key].UserStars, currentUserGame.UserStars);
                        currentUserGame.UserStars = maxScore;
                        corrupted.Add(userGameLevels[key]);
                        userGameLevels[key] = currentUserGame;
                    }
                }
                else
                {
                    userGameLevels.Add(key, currentUserGame);
                }
            }
            context.RemoveRange(corrupted);

            // update if currentScore > score in database
            foreach (var ls in levelScores)
            {
                UserGameLevel currentScore;
                var key = (ls.GameLevelId, ls.GameType);
                if (userGameLevels.ContainsKey(key))
                    currentScore = userGameLevels[key];
                else
                {
                    currentScore = new UserGameLevel(userId, ls.GameLevelId, ls.Score, ls.GameType);
                    userGameLevels.Add(key, currentScore);
                    context.Add(currentScore);
                }

                if (currentScore.UserStars < ls.Score)
                    currentScore.UserStars = ls.Score;
            }
            return userGameLevels.Values;
        }

        private static IList<LevelScore> GetTotalScores(IList<LevelScore> scores)
        {
            Dictionary<int, LevelTotalScoreCalculator> pairs = new Dictionary<int, LevelTotalScoreCalculator>();

            foreach (var s in scores)
            {
                if (!pairs.ContainsKey(s.GameLevelId))
                {
                    pairs.Add(s.GameLevelId, new LevelTotalScoreCalculator());
                }
                pairs[s.GameLevelId].Add(s.Score, s.GameType);
            }
            IList<LevelScore> totalScore = new List<LevelScore>();
            foreach (var key in pairs.Keys)
            {
                totalScore.Add(new LevelScore(key, pairs[key].Score(), GameType.Total));
            }
            return totalScore;
        }

        private class LevelTotalScoreCalculator
        {
            private readonly List<(int score, float complexity)> scoreComplexity;
            public LevelTotalScoreCalculator()
            {
                scoreComplexity = new List<(int score, float complexity)>();
            }

            public void Add(int score, GameType gameType)
            {
                scoreComplexity.Add((score, BaseGameLevel.GetComplexity(gameType)));
            }

            public int Score()
            {
                float sum = scoreComplexity.Sum(d => d.score * d.complexity);
                float complexity = scoreComplexity.Sum(d => d.complexity);
                int score = (int)Math.Round(sum / complexity);
                score = Math.Min(score, UserGameLevel.MAXSTARS);
                score = Math.Max(score, UserGameLevel.MINSTARS);
                return score;
            }
        }
    }
}
