namespace InWords.Data.DTO
{
    /// <inheritdoc />
    /// <summary>
    ///     Foreign and Native words pair
    /// </summary>
    public class WordTranslation : SyncBase
    {
        public string WordForeign { get; set; }

        public string WordNative { get; set; }

        #region Ctor

        public WordTranslation()
        {
        }

        public WordTranslation(string wordForeign, string wordNative, int serverId = 0) : base(serverId)
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