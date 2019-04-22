using InWords.Data;
using InWords.Data.Enums;
using InWords.Data.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InWords.WebApi.Controllers.v1._1
{
    [ApiController]
    [ApiVersion("1.1")]
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


        [HttpGet]
        [Route("")]
        public ActionResult<int> GetAll()
        {
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

//// POST api/values
//[HttpPost]
//public void Post([FromBody] string value)
//{
//}

//// PUT api/values/5
//[HttpPut("{id}")]
//public void Put(int id, [FromBody] string value)
//{
//}

//// DELETE api/values/5
//[HttpDelete("{id}")]
//public void Delete(int id)
//{
//}