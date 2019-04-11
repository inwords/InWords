using System;
using System.Threading.Tasks;
using InWords.Auth.Models;
using InWords.Data.Models;
using InWords.Data.Models.InWords.Repositories;
using InWords.WebApi.Providers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace InWords.WebApi.Controllers.v1
{
    // ReSharper disable once HollowTypeName
    /// <inheritdoc />
    [ApiVersion("1.0")]
    [Route("v{version:apiVersion}/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AccountIdentityProvider accountIdentityProvider;
        private readonly AccountRepository accountRepository;

        #region Ctor

        public AuthController(InWordsDataContext context)
        {
            accountRepository = new AccountRepository(context);
            accountIdentityProvider = new AccountIdentityProvider(accountRepository);
        }

        #endregion

        /// <summary>
        ///     From Request Basic Authorization
        /// </summary>
        /// <returns></returns>
        [Route("token")]
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
            TokenResponse response = await CreateUserAccount(user);

            //send token
            return Ok(response);
        }

        private async Task<TokenResponse> CreateUserAccount(BasicAuthClaims basicAuthClaims)
        {
            //Create account in repository;
            await accountIdentityProvider.CreateUserAccount(basicAuthClaims.Email, basicAuthClaims.Password);

            //Create token
            TokenResponse response =
                accountIdentityProvider.GetIdentity(basicAuthClaims.Email, basicAuthClaims.Password);
            return response;
        }
    }
}