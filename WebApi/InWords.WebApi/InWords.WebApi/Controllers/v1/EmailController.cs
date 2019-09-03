using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InWords.Data.Domains;
using InWords.Data.Repositories;
using InWords.Service.Auth.Extensions;
using InWords.Service.Auth.Models;
using InWords.WebApi.Services.Email;
using InWords.WebApi.Services.Email.Models;
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
        [Route("Confirm/{encryptlink}")]
        public async Task<IActionResult> ConfirmLink(string encryptlink)
        {
            //UUID.randomUUID().toString()
            throw new NotImplementedException();
            //try
            //{
            // 
            //    await emailVerifierService.IsCodeCorrect(userId, email, code);
            //}
            //catch (ArgumentException e)
            //{
            //    return StatusCode(StatusCodes.Status422UnprocessableEntity, "Email code is incorrect");
            //}
            //catch (TimeoutException e)
            //{
            //    return StatusCode(StatusCodes.Status403Forbidden, "Too many attempts for email activation");
            //}
        }

        [Authorize]
        [HttpPost]
        [Route("ConfirmCode")]
        public async Task<IActionResult> ConfirmCode([FromBody] EmailClaims emailClaims)
        {
            int authorizedId = User.GetUserId();

            try
            {
                await emailVerifierService.IsCodeCorrect(authorizedId, emailClaims.Email, emailClaims.Code);
                await accountRepository.SetEmail(authorizedId, emailClaims.Email, Data.Enums.EmailStates.Verified);
                return NoContent();
            }
            catch (ArgumentException e)
            {
                return StatusCode(StatusCodes.Status422UnprocessableEntity, "Email code is incorrect");
            }
            catch (TimeoutException e)
            {
                return StatusCode(StatusCodes.Status403Forbidden, "Too many attempts for email activation");
            }
        }
    }
}