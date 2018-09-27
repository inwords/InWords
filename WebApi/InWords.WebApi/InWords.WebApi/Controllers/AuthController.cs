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

        #region Ctor
        public AuthController()
        {
            accountRepository = new AccountRepository(new InWordsDataContext());
            accountIdentityProvider = new AccountIdentityProvider(accountRepository);
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
            ClaimsIdentity identity = accountIdentityProvider.GetIdentity(Request);

            if (identity == null)
            {
                return BadRequest("Invalid username or password.");
            }

            TokenResponse tokenResponse = new TokenResponse(identity);

            return Ok(tokenResponse);
        }

        [Route("registration")]
        [HttpPost]
        public async Task<IActionResult> Registration([FromBody] BasicAuthClaims user)
        {
            //check if accaunt exist;
            if (accountRepository.ExistAny(a => a.Email == user.Email))
            {
                return BadRequest($"User already exist {user.Email}");
            }

            //Create account in repository;
            Account newAccaunt = await CreateUserAccaunt(user);

            //Get identity;
            ClaimsIdentity identity = accountIdentityProvider.GetIdentity(newAccaunt);

            //Create token
            TokenResponse response = new TokenResponse(identity);

            //send token
            return Ok(response);
        }




        #region Adaptor

        private async Task<Account> CreateUserAccaunt(BasicAuthClaims basicAuthClaims)
        {
            return await accountRepository.CreateUserAccaunt(basicAuthClaims.Email, basicAuthClaims.Password);
        }

        #endregion
    }
}