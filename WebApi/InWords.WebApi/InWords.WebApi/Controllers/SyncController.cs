using System.Collections.Generic;
using System.Threading.Tasks;
using InWords.Auth.Extensions;
using InWords.Data.Models;
using InWords.Transfer.Data.Models;
using InWords.WebApi.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InWords.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SyncController : ControllerBase
    {
        private readonly InWordsDataContext context;
        private readonly SyncService syncService;


        public SyncController(InWordsDataContext context)
        {
            this.context = context;
            syncService = new SyncService(context);
        }

        [Route("WordPairs")]
        [HttpPost]
        //todo PushRequest (list<wordTranslation> + serverId_toDelete)
        public IActionResult PushWordPairs([FromBody] IEnumerable<WordTranslation> wordTranslationList)
        {
            //foreach (WordTranslation WordTranslation in wordTranslationList)
            //{
            //    //ServerID = 0;
            //    if (WordTranslation.ServerId == 0)
            //    {
            //        //add
            //    }
            //    else if (WordTranslation.ServerId < 0)
            //    {
            //        //delete
            //    }
            //    else
            //    {
            //        //check exist
            //    }
            //    //Server.ID = serverID
            //    //ServerID =-ID;
            //}
            return Ok();
        }

        [Authorize]
        [Route("pullWordPairs")]
        [HttpPost]
        public async Task<IActionResult> PullWordPairs([FromBody] IEnumerable<int> server_ids)
        {
            int authorizedId = User.Claims.GetUserId();

            PullWordsAnswer pullAnswer = await syncService.PullWordPairs(authorizedId, server_ids);

            return Ok(pullAnswer);
        }
    }
}