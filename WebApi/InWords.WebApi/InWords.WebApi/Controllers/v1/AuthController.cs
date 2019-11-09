using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using InWords.Data.Domains;
using InWords.Data.Repositories;
using InWords.Service.Auth.Models;
using InWords.WebApi.Providers;
using InWords.WebApi.Services.Email;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InWords.WebApi.Controllers.v1
{
    // ReSharper disable once HollowTypeName
    /// <inheritdoc />
    [ApiVersion("1.0")]
    [Route("v{version:apiVersion}/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class AuthController : ControllerBase
    {
        private readonly AccountIdentityProvider accountIdentityProvider;
        private readonly AccountRepository accountRepository;

        private readonly EmailVerifierService emailVerifierService;


        public AuthController(AccountRepository accountRepository,
            UserRepository userRepository,
            EmailVerifierService emailVerifierService)
        {
            this.accountRepository = accountRepository;
            this.emailVerifierService = emailVerifierService;
            // todo inject
            accountIdentityProvider = new AccountIdentityProvider(accountRepository, userRepository);
        }

        /// <summary>
        ///     Request auth token
        /// </summary>
        /// <returns>A newly token</returns>
        /// <response code="200">Success</response>
        /// <response code="400">Access denied</response>
        [ProducesResponseType(typeof(TokenResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Route("token")]
        [HttpPost]
        public async Task<IActionResult> Token([FromBody] BasicAuthClaims user)
        {
            try
            {
                // get token
                TokenResponse tokenResponse = await accountIdentityProvider.GetIdentity(user)
                    .ConfigureAwait(false);

                return Ok(tokenResponse);
            }
            catch (ArgumentNullException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        ///     Create new user
        /// </summary>
        /// <returns>A newly created token</returns>
        /// <response code="200">returns new token</response>
        /// <response code="400">User already exists</response>
        [Route("registration")]
        [HttpPost]
        [ProducesResponseType(typeof(TokenResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Registration([FromBody] BasicAuthClaims user)
        {
            //check if account exist;
            if (accountRepository.ExistAny(a => a.Email == user.Email))
                return BadRequest($"User already exists {user.Email}");

            //Create token
            TokenResponse response = await CreateUserAccount(user)
                .ConfigureAwait(false);

            return Ok(response);
        }

        private async Task<TokenResponse> CreateUserAccount(BasicAuthClaims basicAuthClaims)
        {
            string username = basicAuthClaims.Email.Remove(basicAuthClaims.Email.IndexOf("@", StringComparison.Ordinal));

            //Create account in repository;
            Account account = await accountIdentityProvider
                .CreateUserAccount(basicAuthClaims.Email, basicAuthClaims.Password, username)
                .ConfigureAwait(false);

            // send verifier email
            await emailVerifierService
                .InstatiateVerifierMessage(account.AccountId, username, basicAuthClaims.Email)
                .ConfigureAwait(false);
            
            // create and return token
            return await accountIdentityProvider.GetIdentity(account).ConfigureAwait(false);
        }
    }
}