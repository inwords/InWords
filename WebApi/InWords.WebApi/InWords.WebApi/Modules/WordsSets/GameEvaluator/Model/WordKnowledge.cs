using InWords.WebApi.Business.GameEvaluator.Enum;
using System;

namespace InWords.WebApi.Business.GameEvaluator.Model
{
    public struct WordKnowledge : IEquatable<WordKnowledge>
    {
        public int UserWordPairId { get; private set; }
        public MemoryLevel MemoryLevel { get; private set; }
        public float Complexity { get; private set; }

        public WordKnowledge(int pairId, MemoryLevel memoryLevel, float complexity)
        {
            UserWordPairId = pairId;
            MemoryLevel = memoryLevel;
            Complexity = complexity;
        }

        public override bool Equals(object? obj)
        {
            return obj is WordKnowledge knowledge &&
                   Equals(knowledge);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(UserWordPairId, MemoryLevel, Complexity);
        }

        public bool Equals(WordKnowledge other)
        {
            return UserWordPairId == other.UserWordPairId &&
                   MemoryLevel == other.MemoryLevel &&
                   Complexity == other.Complexity;
        }

        public static bool operator ==(WordKnowledge left, WordKnowledge right)
        {
            return left.Equals(right);
        }

        public static bool operator !=(WordKnowledge left, WordKnowledge right)
        {
            return !(left == right);
        }
    }
}
