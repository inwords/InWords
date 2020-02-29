using System;
using System.Linq;
using System.Threading.Tasks;
using InWords.Data.Domains;
using InWords.Data.Enums;
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
        private readonly AccountRepository accountRepository;
        private readonly EmailCodeVerificationService emailCodeVerificationService;
        private readonly EmailLinkVerificationService emailLinkVerificationService;
        private readonly EmailVerifierService emailVerifierService;

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
        [Obsolete]
        [Route("SendActivationCode")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> SendActivationCode([FromBody] string email)
        {
            Account account = accountRepository
                .GetWithInclude(g => g.AccountId.Equals(User.GetUserId()), a => a.User)
                .SingleOrDefault();

            if (account == null)
                return NotFound();

            if (string.IsNullOrWhiteSpace(email))
                email = account.Email;
            try
            {
                await emailVerifierService.InstatiateVerifierMessage(account.User, email).ConfigureAwait(false);
            }
            catch (TimeoutException e)
            {
                return BadRequest(e);
            }

            return NoContent();
        }

        [HttpPost]
        [Obsolete]
        [Route("ConfirmCode")]
        public async Task<IActionResult> ConfirmCode([FromBody] EmailClaims emailClaims)
        {
            int authorizedId = User.GetUserId();

            try
            {
                await emailCodeVerificationService.HasCorrectCode(authorizedId, emailClaims.Email, emailClaims.Code)
                    .ConfigureAwait(false);
                await accountRepository.SetEmail(authorizedId, emailClaims.Email)
                    .ConfigureAwait(false);
                return NoContent();
            }
            catch (ArgumentNullException)
            {
                return NotFound("Email not found or not registered");
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
        [Route("Confirm/{encryptLink}")]
        public async Task<IActionResult> ConfirmLink(string encryptLink)
        {
            bool isExist = await emailLinkVerificationService.HasCorrectLink(encryptLink)
                .ConfigureAwait(false);
            if (isExist) return Ok("Email has been successfully confirmed");
            return NotFound("Email not found");
        }

        [Obsolete]
        [HttpGet]
        [Route("ConfirmUserById/{id}")]
        [Authorize(Roles = nameof(RoleType.Admin))]
        public async Task<IActionResult> ConfirmUserById(int id)
        {
            Account account = accountRepository.GetWithInclude(g => g.AccountId.Equals(id), a => a.User)
                .SingleOrDefault();

            if (account == null)
                return NotFound();

            try
            {
                await emailVerifierService.InstatiateVerifierMessage(account.User, account.Email)
                    .ConfigureAwait(false);
            }
            catch (TimeoutException e)
            {
                return BadRequest(e);
            }

            return NoContent();
        }
    }
}