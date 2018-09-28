using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InWords.Transfer.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InWords.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SyncController : ControllerBase
    {
        [Route("WordPairs")]
        [HttpPost]
        public async Task<IActionResult> WordPairs([FromBody] IEnumerable<WordTranslation> wordTranslationList)
        {
            foreach (WordTranslation wordtranstation in wordTranslationList)
            {
                //ServerID = 0;
                if (wordtranstation.ServerId == 0)
                {
                    //add
                }
                else if (wordtranstation.ServerId < 0)
                {
                    //delete
                }
                else
                {
                    //check exist
                }
                //Server.ID = serverID
                //ServerID =-ID;
            }
            return Ok();
        }
    }
}