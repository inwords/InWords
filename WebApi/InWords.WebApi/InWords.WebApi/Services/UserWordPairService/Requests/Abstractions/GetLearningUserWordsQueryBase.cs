namespace InWords.WebApi.Services.UserWordPairService.Requests.Abstractions
{
    public class GetLearningUserWordsQueryBase
    {
        public int DaysForward { get; set; } = 1;
        public int UserId { get; set; }
        public GetLearningUserWordsQueryBase(int userId)
        {
            UserId = userId;
        }
    }
}
