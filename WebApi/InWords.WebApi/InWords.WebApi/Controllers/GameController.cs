using System.Collections.Generic;
using System.Threading.Tasks;
using InWords.Auth.Extensions;
using InWords.Data.Enums;
using InWords.Data.Models;
using InWords.Transfer.Data.Models;
using InWords.Transfer.Data.Models.GameBox;
using InWords.Transfer.Data.Models.GameBox.LevelMetric;
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

        [Route("addGamePack")]
        [HttpPost]
        public async Task<IActionResult> AddGamePack([FromBody] GamePack gamePack)
        {
            int authorizedId = User.Claims.GetUserId();

            SyncBase answer = await gameService.AddGamePack(authorizedId, gamePack);

            return Ok(answer);
        }

        // TODO: add game to user table
        [Route("score")]
        [HttpPost]
        public async Task<IActionResult> PostScore(LevelResult levelResult)
        {
            int authorizedId = User.Claims.GetUserId();

            LevelScore answer = await gameService.LevelResultToScore(authorizedId, levelResult);

            return Ok(answer);
        }

        [Route("GameInfo")]
        [HttpGet]
        public IActionResult GetGameInfo()
        {
            List<GameInfo> answer = gameService.GetGamesInfos();

            return Ok(answer);
        }

        [Route("{id}")]
        [HttpGet]
        public async Task<IActionResult> GetGame(int id)
        {
            int userId = User.Claims.GetUserId();

            Game answer = await gameService.GetGame(userId, id);

            if (answer == null) return NotFound();

            return Ok(answer);
        }

        [Route("level/{id}")]
        [HttpGet]
        public IActionResult GetLevel(int id)
        {
            int userId = User.Claims.GetUserId();

            Level answer = gameService.GetLevel(userId, id);

            return Ok(answer);
        }


        /// <summary>
        ///     This is api to delete game box
        ///     Deletion allow only if it is your game
        ///     of if your are admin
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete]
        [Route("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return await DeleteRange(id);
        }

        [HttpPost]
        [Route("DeleteRange")]
        public async Task<IActionResult> DeleteRange(params int[] ids)
        {
            int userId = HttpContext.User.Claims.GetUserId();

            string role = HttpContext.User.Claims.GetUserRole();

            int count = role == RoleType.Admin.ToString()
                ? await gameService.DeleteGames(ids)
                : await gameService.DeleteGames(userId, ids);

            return count == 0 ? (IActionResult) NotFound() : Ok(count);
        }
    }
}