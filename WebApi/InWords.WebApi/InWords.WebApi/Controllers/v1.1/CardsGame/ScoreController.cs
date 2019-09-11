using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using InWords.Data.DTO.GameBox;
using InWords.Data.DTO.GameBox.LevelMetric;
using InWords.Service.Auth.Extensions;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApi.Services.GameService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InWords.WebApi.Controllers.v1._1.CardsGame
{
    [Authorize]
    [ApiVersion("1.1")]
    [Route("v{version:apiVersion}/Game")]
    [ApiController]
    [Produces("application/json")]
    public class ScoreController : ControllerBase
    {
        private readonly IGameScoreService gameScoreService;
        private readonly GameService gameService;

        public ScoreController(GameScoreService gameScoreService, GameService gameService)
        {
            this.gameScoreService = gameScoreService;
            this.gameService = gameService;
        }

        /// <summary>
        ///     Use this to post score after game
        /// </summary>
        /// <deprecated>true</deprecated>
        /// <param name="levelResult"></param>
        /// <returns>Quantity of stars</returns>
        [Route("score")]
        [HttpPost]
        public async Task<IActionResult> PostScore(CardGameScore cardGameScore)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        ///     Use to upload user results
        /// </summary>
        /// <param name="levelScores"></param>
        /// <returns>Quantity of stars and level id</returns>
        [Route("UploadScore")]
        [HttpPost]
        public async Task<IActionResult> UploadScore(IEnumerable<CardGameScore> cardGameScores)
        {
            throw new NotImplementedException();
        }
    }
}