namespace InWords.Transfer.Data
{
    /// <summary>
    /// Describe Title, TotalStars, SuccessStars
    /// </summary>
    public abstract class BaseInfo
    {
        public string Title { get; set; }

        public int TotalStars { get; set; }

        public int SuccessStars { get; set; }
    }
}
