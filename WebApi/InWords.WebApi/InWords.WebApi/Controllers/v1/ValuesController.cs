using InWords.Data.Models;
using InWords.Data.Models.InWords.Repositories;
using InWords.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InWords.WebApi.Controllers.v1
{
    [ApiController]
    [ApiVersion("1.0", Deprecated = true)]
    [Route("v{version:apiVersion}/[controller]")]
    public class ValuesController : ControllerBase
    {
        private readonly UserRepository userRepository;

        public ValuesController(InWordsDataContext context)
        {
            userRepository = new UserRepository(context);
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

        // GET api/values
        //IEnumerable<string>
        [HttpGet]
        [Route("")]
        public ActionResult<int> GetUsersCount()
        {
            return userRepository.Count();
        }

        [Authorize]
        [HttpGet]
        [Route("getLogin")]
        public IActionResult GetLogin()
        {
            return Ok($"login: {User.Identity.Name}");
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("getRole")]
        public IActionResult GetRole()
        {
            return Ok("Role: Admin");
        }

        [HttpGet]
        [Route("Score/{words}:{open}")]
        public IActionResult GetScore(int words, int open)
        {
            int x = GameLogic.GameScore(words, open);
            return Ok(x);
        }
    }
}