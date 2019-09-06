using System;
using System.Linq;
using System.Threading.Tasks;
using InWords.Data.Domains;
using InWords.Data.Repositories;
using InWords.Service.Auth.Extensions;
using InWords.WebApi.Services.Email;
using InWords.WebApi.Services.Email.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InWords.WebApi.Controllers.v1
{
    [Authorize]
    [ApiVersion("1.0")]
    [Route("v{version:apiVersion}/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly AccountRepository accountRepository = null;
        private readonly EmailVerifierService emailVerifierService = null;
        private readonly EmailCodeVerificationService emailCodeVerificationService = null;
        private readonly EmailLinkVerificationService emailLinkVerificationService = null;

        public EmailController(EmailVerifierService emailVerifierService,
            AccountRepository accountRepository,
            EmailCodeVerificationService emailCodeVerificationService,
            EmailLinkVerificationService emailLinkVerificationService)
        {
            this.emailVerifierService = emailVerifierService;
            this.accountRepository = accountRepository;
            this.emailCodeVerificationService = emailCodeVerificationService;
            this.emailLinkVerificationService = emailLinkVerificationService;
        }

        [Route("SendActivationCode")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> SendActivationCode([FromBody] string email)
        {
            int authorizedId = User.GetUserId();
            Account account = accountRepository.GetWithInclude(g => g.AccountId.Equals(authorizedId), a => a.User).SingleOrDefault();
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

        [HttpPost]
        [Route("ConfirmCode")]
        public async Task<IActionResult> ConfirmCode([FromBody] EmailClaims emailClaims)
        {
            int authorizedId = User.GetUserId();

            try
            {
                await emailCodeVerificationService.HasCorrectCode(authorizedId, emailClaims.Email, emailClaims.Code);
                await accountRepository.SetEmail(authorizedId, emailClaims.Email);
                return NoContent();
            }
            catch (ArgumentNullException)
            {
                return NotFound("Email not found or not registred");
            }
            catch (ArgumentException)
            {
                return StatusCode(StatusCodes.Status422UnprocessableEntity, "Email code is incorrect");
            }
            catch (TimeoutException)
            {
                return StatusCode(StatusCodes.Status403Forbidden, "Too many attempts for email activation");
            }
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("Confirm/{encryptlink}")]
        public async Task<IActionResult> ConfirmLink(string encryptlink)
        {
            try
            {
                //TODO BOOl
                await emailLinkVerificationService.HasCorrectLink(encryptlink);
                return Ok("Email has been successfully confirmed");
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