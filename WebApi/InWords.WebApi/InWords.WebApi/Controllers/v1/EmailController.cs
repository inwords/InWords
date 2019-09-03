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
            Account account = accountRepository.GetWithInclude(g => g.AccountId.Equals(authorizedId),
                a => a.User).SingleOrDefault();
            if (string.IsNullOrWhiteSpace(email))
            {
                email = account.Email;
            }
            try
            {
                await emailVerifierService.InstatiateVerifierMessage(account.User, email);
            }
            catch (TimeoutException e)
            {
                return BadRequest(e);
            }
            return NoContent();
        }

        [HttpGet]
        [Route("Confirm/{id};{authorizedId};{code}")]
        public async Task<IActionResult> Confirm(int userId, string email, int code)
        {
            // check valid email
            bool valid = await emailVerifierService.IsCodeCorrect(userId, email, code);
            if (valid)
            {
                // set confirmed email
                Account account = await accountRepository.FindById(userId);
                account.EmailState = Data.Enums.EmailStates.Verified;
                account.Email = email;
                await accountRepository.Update(account);
                return Ok(valid);
            }
            else
            {
                return StatusCode(StatusCodes.Status422UnprocessableEntity, "Email code is incorrect");
            }
        }
    }
}