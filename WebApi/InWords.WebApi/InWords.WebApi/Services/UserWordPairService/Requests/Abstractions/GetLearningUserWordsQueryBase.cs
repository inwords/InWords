using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.UserWordPairService.Requests
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
