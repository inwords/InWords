namespace InWords.Transfer.Data
{
    /// <summary>
    /// Words transfer request pack
    /// </summary>
    public class WordTranslation : SyncBase
    {
        public string WordForeign { get; protected set; }

        public string WordNative { get; protected set; }

        #region Ctor

        public WordTranslation() { }

        public WordTranslation(WordTranslation WordTranslation) : base((WordTranslation as SyncBase))
        {
            WordForeign = WordTranslation.WordForeign;
            WordNative = WordTranslation.WordNative;
        }
        #endregion
    }
}
