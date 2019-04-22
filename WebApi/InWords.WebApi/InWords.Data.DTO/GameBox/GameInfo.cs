namespace InWords.Data.DTO.GameBox
{
    /// <summary>
    /// Provides information about game Id, creator id, description and title.
    /// Also describe game is that game is available
    /// </summary>
    public class GameInfo
    {
        public int GameId { get; set; }

        public int CreatorId { get; set; }

        public string Description { get; set; }

        public string Title { get; set; }

        public bool IsAvailable { get; set; }
    }
}