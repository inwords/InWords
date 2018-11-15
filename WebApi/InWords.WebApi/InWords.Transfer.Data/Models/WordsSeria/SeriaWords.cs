namespace InWords.Transfer.Data
{
    using System;
    using System.Collections.Generic;
    using System.Text;

    /// <summary>
    /// This is the list of words without a description of the series
    /// //todo add discription or more classes
    /// </summary>
    public class SeriaWords : SyncBase
    {
        public List<WordsLevel> WordsLevels { get; set; }

        public void Add(string WordsNative, string wordForeign, int serverID)
        {
#warning continue here
            /*Make it possible to add a word, but keep in mind 
             * that the words should be added to the desired levels.*/
            //var x = new WordsLevel();
            //todo WordsLevel.add(?) or not
            //WordsLevels.Add()
        }
    }
}
