namespace InWords.WebApi.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using InWords.Auth;
    using InWords.Data;
    using InWords.Data.Models;
    using InWords.Transfer.Data;
    using InWords.WebApi.Service;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
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
        [Route("addgamepack")]
        [HttpPost]
        public async Task<IActionResult> AddGamePack([FromBody] GamePack gamePack)
        {
            int authorizedID = User.Claims.GetUserID();

            var answer = await gameService.AddGamePack(authorizedID, gamePack);

            return Ok(answer);
        }

        //TODO: Get GameInfo
        [Route("GameInfo")]
        [HttpGet]
        public async Task<IActionResult> GetGameInfo()
        {
            var answer = await gameService.GetGameInfo();

            return Ok(answer);
        }
        //TODO: Get Game

        //TODO: Get Level


        //TODO: Delete Game
    }
}