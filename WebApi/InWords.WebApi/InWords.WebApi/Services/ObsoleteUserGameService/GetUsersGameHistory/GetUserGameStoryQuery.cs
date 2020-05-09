using InWords.Data.DTO.GameBox;
using MediatR;
using System.Collections.Generic;

namespace InWords.WebApi.Services.UserGameService.GetUsersGameHistory
{
    public class GetUserGameStoryQuery : IRequest<List<LevelInfo>>
    {
        public int UserId { get; set; }
        public int StoryCount { get; set; }
        public int Page { get; set; }
    }
}
