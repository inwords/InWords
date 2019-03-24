using System.Reflection.Metadata;
using System.Threading.Tasks;
using InWords.Data.Enums;
using InWords.Data.Models;
using InWords.Data.Models.InWords.Domains;
using InWords.Data.Models.InWords.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InWords.WebApi.Controllers.v2
{
    [ApiController]
    [ApiVersion("1.1")]
    [Route("api/[controller]")]
    public class ValuesController : ControllerBase
    {
        private readonly UserRepository userRepository;

        public ValuesController(InWordsDataContext context)
        {
            userRepository = new UserRepository(context);
        }

        /// <summary>
        ///    GET api/values/version
        ///    This is to get requested Api version
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("version")]
        public ActionResult GetVersion()
        {
            return Ok(HttpContext.GetRequestedApiVersion());
        }


        [HttpGet]
        public ActionResult<int> Get()
        {
            return userRepository.Count();
        }

        [Authorize]
        [Route("login")]
        public IActionResult GetLogin()
        {
            return Ok($"login: {User.Identity.Name}");
        }

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