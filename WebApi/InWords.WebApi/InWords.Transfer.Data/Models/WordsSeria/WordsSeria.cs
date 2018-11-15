namespace InWords.Transfer.Data.WordsSeria
{
    using System;
    using System.Collections.Generic;
    using System.Text;

    /// <summary>
    /// This is the list of words without a description of the series
    /// //todo add discription or more classes
    /// </summary>
    public class WordsSeria : SyncBase
    {
        public List<WordsLevel> WordsLevels { get; set; }
    }
}
