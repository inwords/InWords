using InWords.Common.GameEvaluator.Enum;

namespace InWords.Common.GameEvaluator.Model
{
    public struct WordKnowledge
    {
        public int UserWordPairId { get; private set; }
        public MemoryLevel MemoryLevel { get; private set; }
        public int Period { get; private set; }

        public WordKnowledge(int pairId, MemoryLevel memoryLevel, int period)
        {
            UserWordPairId = pairId;
            MemoryLevel = memoryLevel;
            Period = period;
        }
    }
}
