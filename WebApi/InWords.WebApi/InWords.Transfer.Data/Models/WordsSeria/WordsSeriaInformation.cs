
namespace InWords.Transfer.Data
{
    using System;
    using System.Collections.Generic;
    using System.Text;

    /// <summary>
    /// Transfer packet that contain Title, description. 
    /// Extends <see cref="SyncBase"/>
    /// </summary>
    public class WordsSeriaInformation : SyncBase, ICloneable
    {
        public string Title { get; set; }

        public string Description { get; set; }

        #region ctors
        public WordsSeriaInformation() { }

        public WordsSeriaInformation(SyncBase wordTranslationBase) : base(wordTranslationBase)
        {
            //base Id = onClientID; ServerId = serverID;
        }

        public WordsSeriaInformation(WordsSeriaInformation wordsSetInformation) : base((wordsSetInformation as SyncBase))
        {
            Title = wordsSetInformation.Title;
            Description = wordsSetInformation.Description;
        }
        #endregion
    }
}
