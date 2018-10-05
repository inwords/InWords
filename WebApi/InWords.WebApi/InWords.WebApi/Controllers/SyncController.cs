using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InWords.Auth.Providers;
using InWords.Data.Models.Repositories;
using InWords.Transfer.Data;
using InWords.Transfer.Data.Models;
using InWords.WebApi.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InWords.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SyncController : ControllerBase
    {
        private readonly Data.InWordsDataContext context = null;
        private readonly SyncService syncSercive = null;


        public SyncController()
        {
            context = new Data.InWordsDataContext();
            syncSercive = new SyncService(context);
        }

        [Route("WordPairs")]
        [HttpPost]//todo PushRequest (list<wordtransltaion> + serverId_todelete)
        public IActionResult PushWordPairs([FromBody] IEnumerable<WordTranslation> wordTranslationList)
        {
            //foreach (WordTranslation wordtranstation in wordTranslationList)
            //{
            //    //ServerID = 0;
            //    if (wordtranstation.ServerId == 0)
            //    {
            //        //add
            //    }
            //    else if (wordtranstation.ServerId < 0)
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
        [Route("Pull")]
        [HttpPost]
        public async Task<IActionResult> PullWordPairs([FromBody] IEnumerable<int> server_ids)
        {
            int authorizedID = AuthProvider.GetUserID(User);

            var pullResponce = await syncSercive.PullWordPairs(authorizedID, server_ids);

            return Ok(pullResponce);
        }
    }
}