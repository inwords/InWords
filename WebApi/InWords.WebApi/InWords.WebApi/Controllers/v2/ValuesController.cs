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
    [ApiVersion("1.01")]
    [Route("api/v1.01/[controller]")]
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