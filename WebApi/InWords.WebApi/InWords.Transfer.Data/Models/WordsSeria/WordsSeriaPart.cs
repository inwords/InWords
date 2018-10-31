namespace InWords.Transfer.Data
{
    using System.Collections.Generic;
    /// <summary>
    /// Provide wordpair, serverid, clientid, 
    /// </summary>
    public class WordsSeriaPart
    {
        public int SeriaID { get; set; }

        public int Level { get; set; }

        public List<WordTranslation> WordTranslations { get; set; }

        public WordsSeriaPart() { }

        public WordsSeriaPart(int seriaID, int level, params WordTranslation[] wordTranslation)
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
