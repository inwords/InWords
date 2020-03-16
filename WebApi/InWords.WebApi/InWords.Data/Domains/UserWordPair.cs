using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InWords.Data.Domains
{
    public class UserWordPair
    {
        [Key] public int UserWordPairId { get; set; }

        public int WordPairId { get; set; }

        [ForeignKey(nameof(WordPairId))] public virtual WordPair WordPair { get; set; }

        public bool IsInvertPair { get; set; }

        public int UserId { get; set; }

        [ForeignKey(nameof(UserId))] public virtual User User { get; set; }

        public short LearningPeriod { get; set; }

        public DateTime TimeGap { get; set; }

        public UserWordPair()
        {

        }

        public UserWordPair(int wordPairId, int userId)
        {
            WordPairId = wordPairId;
            UserId = userId;
        }
    }
}