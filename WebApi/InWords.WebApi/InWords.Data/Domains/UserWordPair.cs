using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InWords.Data.Domains
{
    public class UserWordPair
    {
        [Key] public int UserWordPairId { get; set; }
        public int UserId { get; set; }
        [MaxLength(128)] public string ForeignWord { get; set; }
        [MaxLength(128)] public string NativeWord { get; set; }
        public bool Background { get; set; }
        [ForeignKey(nameof(UserId))] public virtual User User { get; set; }
        public short LearningPeriod { get; set; }
        public DateTime TimeGap { get; set; }
        public UserWordPair()
        {

        }
    }
}