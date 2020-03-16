﻿using InWords.Data.DTO;
using InWords.Data.DTO.GameBox;
using InWords.Data.Enums;
using InWords.WebApi.Models.CardGameParser;
using InWords.WebApi.Services.GameService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace InWords.WebApi.Controllers.v1.CardsGame
{
    [ApiController]
    [Produces("application/json")]
    [Route("v{version:apiVersion}/Game")]
    public class CardGameParserController : ControllerBase
    {
        private readonly GameService gameService;

        public CardGameParserController(GameService gameService)
        {
            this.gameService = gameService;
        }

        [HttpGet]
        [Route("UpdateGame/{gameId}")]
        [Authorize(Roles = nameof(RoleType.Admin))]
        public async Task<IActionResult> UpdateGame(int gameId)
        {
            string source = System.IO.File.ReadAllText("AppData/CardsGames.txt");
            var parser = new TextParser(source);
            GamePack gamePack = parser.GetGameObject(gameId);
            SyncBase answer = await gameService.AddGamePackAsync(122, gamePack);
            return Ok(gamePack);
        }
    }
}