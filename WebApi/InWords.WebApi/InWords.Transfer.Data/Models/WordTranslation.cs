namespace InWords.Transfer.Data
{
    /// <summary>
    /// Words transfer request pack
    /// </summary>
    public class WordTranslation : SyncBase
    {
        public string WordForeign { get; set; }

        public string WordNative { get; set; }

        #region Ctor

        public WordTranslation() { }

        public WordTranslation(string wordForeign, string wordNative)
        {
            WordForeign = wordForeign;
            WordNative = wordNative;
        }

        public WordTranslation(WordTranslation WordTranslation) : base((WordTranslation as SyncBase))
        {
            WordForeign = WordTranslation.WordForeign;
            WordNative = WordTranslation.WordNative;
        }
        #endregion
    }
}
