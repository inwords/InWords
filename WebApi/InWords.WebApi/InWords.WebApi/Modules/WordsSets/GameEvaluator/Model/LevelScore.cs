using InWords.Data.Enums;
using System;
using System.Diagnostics.CodeAnalysis;

namespace InWords.WebApi.Business.GameEvaluator.Model
{
    public struct LevelScore : IEquatable<LevelScore>
    {
        public LevelScore(int gameLevelId, int score, GameType gameType)
        {
            GameLevelId = gameLevelId;
            Score = score;
            GameType = gameType;
        }

        public int GameLevelId { get; private set; }
        public int Score { get; private set; }
        public GameType GameType { get; private set; }

        public override bool Equals(object? obj)
        {
            return obj is LevelScore score &&
                   Equals(score);
        }

        public bool Equals([AllowNull] LevelScore other)
        {
            return GameLevelId == other.GameLevelId &&
                   Score == other.Score &&
                   GameType == other.GameType;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(GameLevelId, Score, GameType);
        }

        public static bool operator ==(LevelScore left, LevelScore right)
        {
            return left.Equals(right);
        }

        public static bool operator !=(LevelScore left, LevelScore right)
        {
            return !(left == right);
        }
    }
}
