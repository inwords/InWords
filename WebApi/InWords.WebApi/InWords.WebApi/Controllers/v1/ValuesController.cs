using InWords.Data;
using InWords.Data.Repositories;
using InWords.WebApi.Services.FtpLoader.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

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

        #region ctor

        private readonly UserRepository userRepository;
        private readonly FileLoader loader;
        private readonly InWordsDataContext context;
        /// <summary>
        /// </summary>
        /// <param name="context"></param>
        public ValuesController(InWordsDataContext context, FileLoader ftpLoader)
        {
            this.context = context;
            userRepository = new UserRepository(context);
            loader = ftpLoader;
        }

        #endregion
    }
}