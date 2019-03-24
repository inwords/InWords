using System;
using System.Threading.Tasks;
using InWords.Auth.Models;
using InWords.Data.Models;
using InWords.Data.Models.InWords.Repositories;
using InWords.WebApi.Providers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace InWords.WebApi.Controllers.Native
{
    [ApiVersion("1.0")]
    [ApiVersion("2.0")]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ILogger<AuthController> logger;

        #region Ctor

        public AuthController(InWordsDataContext context, ILogger<AuthController> logger)
        {
            this.logger = logger;
            accountRepository = new AccountRepository(context);
            accountIdentityProvider = new AccountIdentityProvider(accountRepository, logger);
        }

        #endregion

        /// <summary>
        ///     From Request Basic Authorization
        /// </summary>
        /// <returns></returns>
        [Route("token")]
        [MapToApiVersion("2.0")]
        [HttpPost]
        public IActionResult Token([FromBody] BasicAuthClaims user)
        {
            try
            {
                TokenResponse tokenResponse = accountIdentityProvider.GetIdentity(user);
                return Ok(tokenResponse);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("registration")]
        [HttpPost]
        public async Task<IActionResult> Registration([FromBody] BasicAuthClaims user)
        {
            //check if account exist;
            if (accountRepository.ExistAny(a => a.Email == user.Email))
                return BadRequest($"User already exists {user.Email}");

            //Create token
            TokenResponse response = await CreateUserAccaunt(user);

            //send token
            return Ok(response);
        }

        #region Adaptor

        private async Task<TokenResponse> CreateUserAccaunt(BasicAuthClaims basicAuthClaims)
        {
            //Create account in repository;
            await accountIdentityProvider.CreateUserAccount(basicAuthClaims.Email, basicAuthClaims.Password);

            //Create token
            TokenResponse response =
                accountIdentityProvider.GetIdentity(basicAuthClaims.Email, basicAuthClaims.Password);
            return response;
        }

        #endregion

        #region props

        private readonly AccountRepository accountRepository;

        private readonly AccountIdentityProvider accountIdentityProvider;

        #endregion
    }
}