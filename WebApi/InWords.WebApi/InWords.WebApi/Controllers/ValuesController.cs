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
    [ApiVersionNeutral]
    public class ValuesController : ControllerBase
    {
        private readonly UserRepository userRepository = null;

        private readonly WordRepository wordRepository = null;

        private readonly WordPairRepository wordPairRepository = null;

        public ValuesController(InWordsDataContext context)
        {
            userRepository = new UserRepository(context);
            wordRepository = new WordRepository(context);
            wordPairRepository = new WordPairRepository(context);
        }

        /// <summary>
        /// This is to get requested Api version
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("version")]
        public ActionResult GetVersion() => Ok(HttpContext.GetRequestedApiVersion());

        // GET api/values
        //IEnumerable<string>
        [HttpGet]
        public ActionResult<int> Get()
        {
            return userRepository.Count();
        }

        // GET api/values/5
        [HttpGet("{words}")]
        public async Task<ActionResult<WordPair>> Get(string words)
        {
            string[] wordsArr = words.Split('.');

            Word first = new Word
            {
                Content = wordsArr[0]
            };

            Word second = new Word
            {
                Content = wordsArr[1]
            };

            return await wordPairRepository.Stack(first, second);
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

        [Authorize(Roles = "Admin")]
        [Route("getrole")]
        public IActionResult GetRole()
        {
            return Ok($"Ваша роль: администратор");
        }
    }
}
