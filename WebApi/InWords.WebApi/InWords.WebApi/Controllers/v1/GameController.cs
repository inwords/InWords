using InWords.Data.DTO;
using InWords.Data.DTO.GameBox;
using InWords.Data.Enums;
using InWords.Data.Repositories;
using InWords.Service.Auth.Extensions;
using InWords.WebApi.Services.GameService;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InWords.WebApi.Controllers.v1.CardsGame
{
    /// <inheritdoc />
    /// <summary>
    ///     This game controller allow CRUD games
    /// </summary>
    [Authorize]
    [ApiVersion("1.0")]
    [Route("v{version:apiVersion}/Game")]
    [ApiController]
    [Produces("application/json")]
    public class GameController : ControllerBase
    {
        private readonly IMediator mediator;
        private readonly CreationRepository creationRepository;
        private readonly GameLevelWordService gameLevelWordService;
        private readonly GameService gameService;

        public GameController(CreationRepository creationRepository,
            GameLevelWordService gameLevelWordService,
            GameService gameService, IMediator mediator)
        {
            this.mediator = mediator;
            this.creationRepository = creationRepository;
            this.gameLevelWordService = gameLevelWordService;
            this.gameService = gameService;
        }

        /// <summary>
        ///     This is to get Words translation list of level
        /// </summary>
        /// <see cref="Level" />
        /// <see cref="WordTranslation" />
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("level/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetLevel(int id)
        {
            Level answer = await gameLevelWordService.GetLevelWordsAsync(id)
                .ConfigureAwait(false);

            return Ok(answer);
        }
    }
}