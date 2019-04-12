using System;

namespace InWords.Transfer.Data.Models
{
    /// <inheritdoc />
    /// <summary>
    ///     Transfer response pack: Id and ServerId
    /// </summary>
    public class SyncBase : ICloneable
    {
        public int Id { get; set; }

        public int ServerId { get; set; }

        object ICloneable.Clone()
        {
            return new SyncBase(this);
        }

        #region Ctor

        /// <summary>
        ///     Constructor part
        /// </summary>
        public SyncBase()
        {
        }

        public SyncBase(int serverId)
        {
            ServerId = serverId;
        }

        public SyncBase(int serverId, int onClientId)
        {
            Id = onClientId;
            ServerId = serverId;
        }


        public SyncBase(SyncBase wordTranslationBase)
        {
            Id = wordTranslationBase.Id;
            ServerId = wordTranslationBase.Id;
        }

        #endregion
    }
}