using System;
using System.Threading.Tasks;
using InWords.Data.Repositories;
using InWords.Service.Auth.Models;
using InWords.WebApi.Providers;
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
        /// <summary>
        ///     Request auth token
        /// </summary>
        /// <returns>A newly token</returns>
        /// <response code="200">Success</response>
        /// <response code="400">Auth error</response>
        [ProducesResponseType(typeof(TokenResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
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

        #region Ctor

        private readonly AccountIdentityProvider accountIdentityProvider;
        private readonly AccountRepository accountRepository;


        public AuthController(AccountRepository accountRepository)
        {
            this.accountRepository = accountRepository;
            accountIdentityProvider = new AccountIdentityProvider(accountRepository);
        }

        #endregion
    }
}