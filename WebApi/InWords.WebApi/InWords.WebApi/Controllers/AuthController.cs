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
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.IdentityModel.Tokens;
    using Newtonsoft.Json;

    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AccountRepository accountRepository = null;

        public AuthController()
        {
            accountRepository = new AccountRepository(new InWordsDataContext());
        }

        [Route("token")]
        [HttpPost]
        public async Task Token()
        {
            var identity = GetIdentity(); //локально
            await SendResponse(identity); //отправка
        }

        [Route("registration")]
        [HttpPost]
        public async Task<IActionResult> Registration([FromBody] BasicAuthClaims user)
        {
            if (accountRepository.ExistAny(a => a.Email == user.Email))
            {
                return BadRequest($"User already exist {user.Email}");
            }
            else
            {
                Account newAccaunt = new Account()
                {
                    Email = user.Email,
                    Password = user.Password,
                    Role = RoleType.User,
                    RegistrationData = DateTime.Now
                };

                try
                {
                    await accountRepository.Create(newAccaunt);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
            return Ok();
        }

        private async Task SendResponse(ClaimsIdentity identity)
        {
            if (identity == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Invalid username or password.");
                return;
            }

            var encodedJwt = AuthOptions.TokenProvider.GenerateToken(identity);
            var response = new
            {
                access_token = encodedJwt,
                email = identity.Name
            };
            // сериализация ответа
            Response.ContentType = "application/json";
            await Response.WriteAsync(JsonConvert.SerializeObject(response, new JsonSerializerSettings { Formatting = Formatting.Indented }));
        }

        private ClaimsIdentity GetIdentity()
        {
            BasicAuthClaims x = Request.GetBasicAuthorizationCalms();
            var identity = accountRepository.GetIdentity(x.Email, x.Password);
            return identity;
        }

    }
}