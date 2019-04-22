// ReSharper disable once CheckNamespace

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InWords.Data.Domains
{
    public class WordPair
    {
        [Key] public int WordPairId { get; set; }

        public int WordForeignId { get; set; }

        [ForeignKey("WordForeignId")] public virtual Word WordForeign { get; set; }

        public int WordNativeId { get; set; }

        [ForeignKey("WordNativeId")] public virtual Word WordNative { get; set; }

        public int Rating { get; set; }
    }
}