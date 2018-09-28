namespace InWords.WebApi.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using InWords.Data.Models.Repositories;
    using Microsoft.AspNetCore.Authorization;
    using InWords.Data.Enums;
    using InWords.Data;
    using InWords.Data.Models;
    using System.Threading.Tasks;

    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly UserRepository userRepository = null;

        private readonly WordRepository wordRepository = null;


        public ValuesController()
        {
            var context = new InWordsDataContext();
            userRepository = new UserRepository(context);
            wordRepository = new WordRepository(context);
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
        public async Task<ActionResult<Word>> Get(string id)
        {
            Word stackedWord = new Word
            {
                Content = id
            };
            
            return await wordRepository.Stack(stackedWord);
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
