// ReSharper disable once CheckNamespace
namespace InWords.Transfer.Data
{
    /// <summary>
    /// Describe Title, TotalStars, SuccessStars
    /// </summary>
    public abstract class StarsInfo
    {
        public int TotalStars { get; set; }

        public int SuccessStars { get; set; }
    }
}
