using System.Collections.Generic;
using System.Threading.Tasks;
using InWords.Auth.Extensions;
using InWords.Data.Models;
using InWords.Transfer.Data.Models;
using InWords.Transfer.Data.Models.GameBox;
using InWords.WebApi.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InWords.WebApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly GameService gameService;

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

            SyncBase answer = await gameService.AddGamePack(authorizedID, gamePack);

            return Ok(answer);
        }

        //TODO: Get GameInfo
        [Route("GameInfo")]
        [HttpGet]
        public async Task<IActionResult> GetGameInfo()
        {
            List<GameInfo> answer = gameService.GetGameInfo();

            return Ok(answer);
        }

        //TODO: Get Game
        [Route("{id}")]
        [HttpGet]
        public async Task<IActionResult> GetGame(int id)
        {
            int userID = User.Claims.GetUserId();

            Game answer = await gameService.GetGameInfo(userID, id);

            return Ok(answer);
        }

        //TODO: Get Level
        [Route("level/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetLevel(int id)
        {
            int userID = User.Claims.GetUserId();

            Level answer = gameService.GetLevel(userID, id);

            return Ok(answer);
        }

        //TODO: Delete Game
    }
}