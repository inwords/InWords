using InWords.WebApi.Business.GameEvaluator.Enum;

namespace InWords.WebApi.Business.GameEvaluator.Model
{
    public struct WordKnowledge
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
    }
}
