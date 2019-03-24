using System.Reflection.Metadata.Ecma335;

namespace InWords.Transfer.Data.Models
{
    /// <inheritdoc />
    /// <summary>
    ///     Foreign and Native words pair
    /// </summary>
    public class WordTranslation : SyncBase
    {
        private string wordForeign = null;
        public string WordForeign
        {
            get => wordForeign;
            set => wordForeign = value.ToLower();
        }

        private string wordNative = null;
        public string WordNative
        {
            get => wordNative;
            set => wordNative = value.ToLower();
        }

        #region Ctor

        public WordTranslation()
        {
        }

        public WordTranslation(string wordForeign, string wordNative)
        {
            WordForeign = wordForeign;
            WordNative = wordNative;
        }

        public WordTranslation(WordTranslation wordTranslation) : base(wordTranslation)
        {
            WordForeign = wordTranslation.WordForeign;
            WordNative = wordTranslation.WordNative;
        }

        #endregion
    }
}