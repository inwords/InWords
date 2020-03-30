using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InWords.Data.Domains
{
    public class UserWordPair
    {
        [Key] public int UserWordPairId { get; set; }

        [Obsolete] public int WordPairId { get; set; }
        [Obsolete] public bool IsInvertPair { get; set; }

        [MaxLength(128)] public string ForeignWord { get; set; }
        [MaxLength(128)] public string NativeWord { get; set; }

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