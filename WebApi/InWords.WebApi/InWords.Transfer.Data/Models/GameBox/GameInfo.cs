namespace InWords.Transfer.Data.Models.GameBox
{
    public class GameInfo
    {
        public int GameId { get; set; }

        public int CreatorId { get; set; }

        public string Description { get; set; }

        public string Title { get; set; }

        public bool IsAvailable { get; set; }
    }
}