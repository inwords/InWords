namespace InWords.Transfer.Data
{
    using System;
    using System.Collections.Generic;
#warning depricated
    /// <summary>
    /// This is to transport words thats contain level of Seria as JSON.
    /// Contains <see cref="WordTranslation"/> 
    /// that extends <seealso cref="SyncBase"/>
    /// </summary>
    [Obsolete]
    public class SeriaOneLevelWords
    {
        /// <summary>
        /// Primary key <see cref="InWords.Data.Seria"/>
        /// </summary>
        public int SeriaID { get; set; }

        /// <summary>
        /// Words set level in InWords.Data.SeriaWord
        /// </summary>
        public int Level { get; set; }

        /// <summary>
        /// This is words set list to Seria level.
        /// </summary>
        public List<WordTranslation> WordTranslations { get; set; }

        public SeriaOneLevelWords() { }

        public SeriaOneLevelWords(int seriaID, int level, params WordTranslation[] wordTranslation)
        {
            SeriaID = seriaID;
            Level = level;
            WordTranslations = new List<WordTranslation>();
            foreach (WordTranslation wordsPair in wordTranslation)
            {
                WordTranslations.Add(wordsPair);
            }
        }
    }
}