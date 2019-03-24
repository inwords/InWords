using System.Threading.Tasks;
using InWords.Data.Models;
using InWords.Data.Models.InWords.Domains;
using InWords.Data.Models.InWords.Repositories;
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

        private readonly WordPairRepository wordPairRepository;

        private readonly WordRepository wordRepository;

        public ValuesController(InWordsDataContext context)
        {
            userRepository = new UserRepository(context);
            wordRepository = new WordRepository(context);
            wordPairRepository = new WordPairRepository(context);
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
        public ActionResult<int> Get()
        {
            return userRepository.Count();
        }

        // GET api/values/5
        [HttpGet("{words}")]
        public async Task<ActionResult<WordPair>> Get(string words)
        {
            string[] wordsArr = words.Split('.');

            var first = new Word
            {
                Content = wordsArr[0]
            };

            var second = new Word
            {
                Content = wordsArr[1]
            };

            return await wordPairRepository.Stack(first, second);
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
    }
}