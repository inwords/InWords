using System;
using System.Collections.Generic;
using System.Text;

namespace InWords.Transfer.Data
{
    /// <summary>
    /// Transfer response pack: Id and ServerId
    /// </summary>
    public class SyncBase : ResultException, ICloneable
    {
        public int Id { get; set; }

        public int ServerId { get; set; }


        /// <summary>
        /// Construnctor part
        /// </summary>
        public SyncBase() { }

        public SyncBase(int serverID)
        {
            ServerId = serverID;
        }

        public SyncBase(int serverID, int onClientID)
        {
            Id = onClientID;
            ServerId = serverID;
        }


        public SyncBase(SyncBase wordTranslationBase)
        {
            Id = wordTranslationBase.Id;
            ServerId = wordTranslationBase.Id;
        }

        object ICloneable.Clone()
        {
            return new SyncBase(this);
        }
    }
}
