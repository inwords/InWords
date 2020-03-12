using Google.Apis.Auth;
using InWords.Data;
using InWords.Data.DTO.Services;
using InWords.Data.Repositories;
using InWords.WebApi.Services.FtpLoader.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace InWords.WebApi.Controllers.v1
{
    /// <summary>
    ///     Controller for test purposes
    /// </summary>
    [ApiController]
    [Produces("application/json")]
    [ApiVersion("1.0", Deprecated = true)]
    [Route("v{version:apiVersion}/[controller]")]
    public class ValuesController : ControllerBase
    {
        /// <summary>
        ///     Get request api version
        /// </summary>
        /// <returns>user with id</returns>
        /// <response code="200">OK</response>
        [ProducesResponseType(typeof(ApiVersion), StatusCodes.Status200OK)]
        [HttpGet]
        [Route("version")]
        public ActionResult GetVersion()
        {
            return Ok(HttpContext.GetRequestedApiVersion());
        }


        /// <summary>
        ///     Find out the number of registered users
        /// </summary>
        /// <returns>user with id</returns>
        /// <response code="200">OK</response>
        [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
        [HttpGet]
        [Route("")]
        public ActionResult<int> GetUsersCount()
        {
            return userRepository.Count();
        }

        /// <summary>
        ///     Get user by id
        /// </summary>
        /// <returns>user with id</returns>
        /// <response code="200">OK</response>
        /// <response code="401">Unauthorized</response>
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [Authorize]
        [HttpGet]
        [Route("getLogin")]
        public IActionResult GetLogin()
        {
            return Ok($"login: {User.Identity.Name}");
        }

        /// <summary>
        ///     To check admin rights (Admin only)
        /// </summary>
        /// <returns>user with id</returns>
        /// <response code="200">OK</response>
        /// <response code="401">Unauthorized</response>
        /// <response code="403">Access denied</response>
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("getRole")]
        public IActionResult GetRole()
        {
            return Ok("Role: Admin");
        }

        /// <summary>
        ///     Check c++ scorelibrary
        /// </summary>
        /// <returns>user with id</returns>
        /// <response code="200">OK</response>
        /// <response code="500">SDK errors</response>
        [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [HttpGet]
        [Route("Score/{words}:{open}")]
        public IActionResult GetScore(int words, int open)
        {
            int x = CardGame.Score(words, open);
            return Ok(x);
        }
        [AllowAnonymous]
        [HttpPost]
        [Route("google")]
        public async Task<IActionResult> Google([FromBody]string tokenId)
        {
            var payload = GoogleJsonWebSignature.ValidateAsync(tokenId, new GoogleJsonWebSignature.ValidationSettings()).Result;
            return Ok(payload);
        }

        #region ctor

        private readonly UserRepository userRepository;
        private readonly FileLoader loader;

        /// <summary>
        /// </summary>
        /// <param name="context"></param>
        public ValuesController(InWordsDataContext context, FileLoader ftpLoader)
        {
            userRepository = new UserRepository(context);
            loader = ftpLoader;
        }

        #endregion
    }
}