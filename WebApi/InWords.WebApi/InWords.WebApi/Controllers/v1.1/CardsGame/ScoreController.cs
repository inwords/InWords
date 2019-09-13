using System;
using System.Threading.Tasks;
using InWords.Data.DTO.GameBox.LevelMetric;
using InWords.Service.Auth.Extensions;
using InWords.WebApi.Services.CardGame;
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
        private readonly GameResultService gameResultService;

        public ScoreController(GameResultService gameResultService)
        {
            this.gameResultService = gameResultService;
        }

        /// <summary>
        ///     Use this to post score after game
        /// </summary>
        /// <deprecated>true</deprecated>
        /// <param name="levelResult"></param>
        /// <returns>Quantity of stars</returns>
        [Route("Score")]
        [HttpPost]
        public async Task<IActionResult> PostScore(CardGameScore cardGameScore)
        {
            int authorizedId = User.GetUserId();

            LevelScore answer;
            // save score to user level
            try
            {
                answer = await gameResultService.SetResults(authorizedId, cardGameScore);
            }
            catch (ArgumentNullException e)
            {
                return BadRequest(e.Message);
            }

            return Ok(answer);
        }

        /// <summary>
        ///     Use to upload user results
        /// </summary>
        /// <param name="levelScores"></param>
        /// <returns>Quantity of stars and level id</returns>
        //[Route("UploadScore")]
        //[HttpPost]
        //public async Task<IActionResult> UploadScore(IEnumerable<CardGameScore> cardGameScores)
        //{
        //    throw new NotImplementedException();
        //}
    }
}