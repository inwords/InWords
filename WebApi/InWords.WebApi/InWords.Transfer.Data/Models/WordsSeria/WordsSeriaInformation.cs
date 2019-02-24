namespace InWords.Transfer.Data
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Transfer packet that contain Title, description. 
    /// Extends <see cref="SyncBase"/>
    /// </summary>
    public class WordsSeriaInformation : SyncBase, ICloneable
    {
        public string CreatorNick { get; set; }

        public ICollection<CreationDescription> WordSeriaDescriptions { get; set; }

        #region ctors
        public WordsSeriaInformation() { }
        #endregion
    }
}