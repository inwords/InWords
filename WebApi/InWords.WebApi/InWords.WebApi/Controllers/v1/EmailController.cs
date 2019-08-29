using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InWords.Data.Domains;
using InWords.Data.Repositories;
using InWords.Service.Auth.Extensions;
using InWords.WebApi.Services.Email;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InWords.WebApi.Controllers.v1
{
    [ApiVersion("1.0")]
    [Route("v{version:apiVersion}/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly EmailVerifierService emailVerifierService = null;
        private readonly UserRepository userRepository = null;

        public EmailController(EmailVerifierService emailVerifierService, UserRepository userRepository)
        {
            this.emailVerifierService = emailVerifierService;
            this.userRepository = userRepository;
        }

        [Authorize]
        [Route("SendActivationCode")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> SendActivationCode()
        {
            int authorizedId = User.GetUserId();
            User user = userRepository.GetWithInclude(u => u.UserId == authorizedId, us => us.Account).SingleOrDefault();
            await emailVerifierService.InstatiateVerifierMessage(user);
            return NoContent();
        }

        [HttpGet]
        [Route("test/{authorizedId}")]
        public async Task<IActionResult> GetScore(int authorizedId)
        {
            User user = userRepository.GetWithInclude(u => u.UserId == authorizedId, us => us.Account).SingleOrDefault();
            await emailVerifierService.InstatiateVerifierMessage(user);
            return Ok();
        }
    }
}