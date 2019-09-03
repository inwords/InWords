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
        private readonly AccountRepository accountRepository = null;

        public EmailController(EmailVerifierService emailVerifierService, AccountRepository accountRepository)
        {
            this.emailVerifierService = emailVerifierService;
            this.accountRepository = accountRepository;
        }

        [Authorize]
        [Route("SendActivationCode")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> SendActivationCode([FromBody] string email)
        {
            int authorizedId = User.GetUserId();
            if (string.IsNullOrWhiteSpace(email))
            {
                Account account = await accountRepository.FindById(authorizedId);
                email = account.Email;
            }
            await emailVerifierService.InstatiateVerifierMessage(authorizedId, email);
            return NoContent();
        }

        [HttpGet]
        [Route("Confirm/{id};{authorizedId};{code}")]
        public async Task<IActionResult> Confirm(int userId, string email, int code)
        {
            bool valid = await emailVerifierService.TryConfirmEmail(userId, email, code);
            return Ok(valid);
        }
    }
}