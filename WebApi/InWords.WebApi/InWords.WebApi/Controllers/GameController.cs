namespace InWords.WebApi.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using InWords.Auth;
    using InWords.Transfer.Data;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        //TODO: Get GameInfo

        //TODO: Get Game

        //TODO: Get Level

        //TODO: Add Game
        [Authorize]
        [Route("add")]
        [HttpPost]
        public async Task<IActionResult> Add([FromBody] Game wordTranslations)
        {
            int authorizedID = User.Claims.GetUserID();

            var answer = await ga.AddPair(authorizedID, wordTranslations);

            return Ok(answer);
        }

        //TODO: Delete Game
    }
}