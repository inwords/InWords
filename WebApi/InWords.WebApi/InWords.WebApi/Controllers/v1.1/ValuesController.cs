using InWords.Data;
using InWords.Data.Enums;
using InWords.Data.Repositories;
using InWords.WebApi.Services.Email;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace InWords.WebApi.Controllers.v1._1
{
    [ApiController]
    [ApiVersion("1.1")]
    [Route("v{version:apiVersion}/[controller]")]
    public class ValuesController : ControllerBase
    {
        private readonly UserRepository userRepository;
        private readonly EmailSender emailSender;

        public ValuesController(InWordsDataContext context,EmailSender sender)
        {
            userRepository = new UserRepository(context);
            this.emailSender = sender;
        }

        /// <summary>
        ///     This is to get requested Api version
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("version")]
        public ActionResult GetVersion()
        {
            return Ok(HttpContext.GetRequestedApiVersion());
        }


        [HttpGet]
        [Route("")]
        public async Task<ActionResult<int>> GetAll()
        {
            await emailSender.SendEmailAsync("anzer987@yandex.ru", "subject", "message");
            return userRepository.Count();
        }

        /// <summary>
        ///     Get your login
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        [Route("login")]
        public IActionResult GetLogin()
        {
            return Ok($"login: {User.Identity.Name}");
        }

        [HttpGet]
        [Authorize(Roles = nameof(RoleType.Admin))]
        [Route("role")]
        public IActionResult GetRole()
        {
            return Ok("Role: Admin");
        }
    }
}