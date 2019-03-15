using InWords.Auth.Extensions;
using InWords.Data.Models;
using InWords.Transfer.Data.Models.GameBox;

namespace InWords.WebApi.Controllers
{
    using System.Threading.Tasks;
    using InWords.Auth;
    using InWords.Data;
    using InWords.Transfer.Data;
    using InWords.WebApi.Service;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly GameService gameService = null;
        public GameController(InWordsDataContext context)
        {
            gameService = new GameService(context);
        }

        //TODO: Add Game
        [Route("addGamePack")]
        [HttpPost]
        public async Task<IActionResult> AddGamePack([FromBody] GamePack gamePack)
        {
            int authorizedID = User.Claims.GetUserId();

            var answer = await gameService.AddGamePack(authorizedID, gamePack);

            return Ok(answer);
        }

        //TODO: Get GameInfo
        [Route("GameInfo")]
        [HttpGet]
        public async Task<IActionResult> GetGameInfo()
        {
            var answer = gameService.GetGameInfo();

            return Ok(answer);
        }

        //TODO: Get Game
        [Route("{id}")]
        [HttpGet]
        public async Task<IActionResult> GetGame(int id)
        {
            var userID = User.Claims.GetUserId();

            var answer = await gameService.GetGameInfo(userID, id);

            return Ok(answer);
        }

        //TODO: Get Level
        [Route("level/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetLevel(int id)
        {
            var userID = User.Claims.GetUserId();

            var answer = gameService.GetLevel(userID, id);

            return Ok(answer);
        }

        //TODO: Delete Game
    }
}