namespace InWords.WebApi.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using InWords.Data.Models.Repositories;
    using Microsoft.AspNetCore.Authorization;
    using InWords.Data.Enums;
    using InWords.Data;

    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly UserRepository userRepository = null;

        public ValuesController()
        {
            userRepository = new UserRepository(new InWordsDataContext());
        }

        // GET api/values
        //IEnumerable<string>
        [HttpGet]
        public ActionResult<int> Get()
        {
            return userRepository.Count();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        [Authorize]
        [Route("getlogin")]
        public IActionResult GetLogin()
        {
            return Ok($"Ваш логин: {User.Identity.Name}");
        }

        [Authorize(Roles = nameof(RoleType.Admin))]
        [Route("getrole")]
        public IActionResult GetRole()
        {
            return Ok($"Ваша роль: администратор");
        }
    }
}
