namespace InWords.WebApi.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.IdentityModel.Tokens.Jwt;
    using System.Linq;
    using System.Security.Claims;
    using System.Text;
    using System.Threading.Tasks;
    using InWords.Auth;
    using InWords.Auth.Interface;
    using InWords.Data;
    using InWords.Data.Enums;
    using InWords.Data.Models;
    using InWords.Data.Models.Repositories;
    using InWords.WebApi.Providers;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
    using Microsoft.IdentityModel.Tokens;
    using Newtonsoft.Json;

    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        #region props

        private readonly AccountRepository accountRepository = null;

        private readonly AccountIdentityProvider accountIdentityProvider = null;
        #endregion

        readonly ILogger logger;

        #region Ctor
        public AuthController(InWordsDataContext context, ILogger<AuthController> logger)
        {
            this.logger = logger;
            accountRepository = new AccountRepository(context);
            accountIdentityProvider = new AccountIdentityProvider(accountRepository, logger);
        }
        #endregion

        /// <summary>
        /// From Request Basic Authorization
        /// </summary>
        /// <returns></returns>
        [Route("token")]
        [HttpPost]
        public IActionResult Token()
        {
            try
            {
                TokenResponse tokenResponse = accountIdentityProvider.GetIdentity(Request);
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
            //check if accaunt exist;
            if (accountRepository.ExistAny(a => a.Email == user.Email))
            {
                return BadRequest($"User already exists {user.Email}");
            }

            //Create token
            TokenResponse response = await CreateUserAccaunt(user);

            //send token
            return Ok(response);
        }

        #region Adaptor

        private async Task<TokenResponse> CreateUserAccaunt(BasicAuthClaims basicAuthClaims)
        {
            //Create account in repository;
            await accountIdentityProvider.CreateUserAccaunt(basicAuthClaims.Email, basicAuthClaims.Password);

            //Create token
            TokenResponse response = accountIdentityProvider.GetIdentity(basicAuthClaims.Email, basicAuthClaims.Password);
            return response;
        }

        #endregion
    }
}