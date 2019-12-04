using System.Collections.Immutable;
using InWords.Data.DTO.Enums;

namespace InWords.Data.DTO.Abstractions
{
    public interface IKnowledgeQualifier
    {
        /// <summary>
        /// Determines how well the user translated a couple of words in this game
        /// </summary>
        /// <returns>Dictionary custom word pair Id and learning level</returns>
        ImmutableDictionary<int, KnowledgeQualities> Qualify();
    }
}
