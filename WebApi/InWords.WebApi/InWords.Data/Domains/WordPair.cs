// ReSharper disable once CheckNamespace

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InWords.Data.Domains
{
    public class WordPair
    {
        [Key] public int WordPairId { get; set; }

        public int WordForeignId { get; set; }

        [ForeignKey(nameof(WordForeignId))] public virtual Word WordForeign { get; set; }

        public int WordNativeId { get; set; }

        [ForeignKey(nameof(WordNativeId))] public virtual Word WordNative { get; set; }

        public int Rating { get; set; }

        public WordPair()
        {

        }

        public WordPair(int WordNativeId, int WordForeignId)
        {
            this.WordNativeId = WordNativeId;
            this.WordForeignId = WordForeignId;
        }
    }
}