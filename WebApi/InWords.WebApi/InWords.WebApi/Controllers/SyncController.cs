using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InWords.Auth.Providers;
using InWords.Data.Models.Repositories;
using InWords.Transfer.Data;
using InWords.Transfer.Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InWords.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SyncController : ControllerBase
    {
        protected readonly Data.InWordsDataContext context = null;
        private readonly UserWordPairRepository userWordPairRepository = null;
        private readonly WordPairRepository wordPairRepository = null;
        private readonly WordRepository wordRepository = null;


        public SyncController()
        {
            context = new Data.InWordsDataContext();
            userWordPairRepository = new UserWordPairRepository(context);
            wordPairRepository = new WordPairRepository(context);
            wordRepository = new WordRepository(context);
        }

        [Route("WordPairs")]
        [HttpPost]//todo PushRequest (list<wordtransltaion> + serverId_todelete)
        public async Task<IActionResult> PushWordPairs([FromBody] IEnumerable<WordTranslation> wordTranslationList)
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

        [Authorize]
        [Route("Pull")]
        [HttpPost]
        public async Task<IActionResult> PullWordPairs([FromBody] IEnumerable<int> server_ids)
        {
            ///string[] server = { "Microsoft", "Google", "Apple" };
            //string[] user = { "Apple", "IBM", "Samsung" };

            // разность множеств
            //var idsToAdd = server.Except(user);
            //Microsoft Google -> idsToAdd


            //var result = user.Except(server);
            //"IBM", "Samsung" //ids to delete

            int authorizedID = AuthProvider.GetUserID(User);

            IEnumerable<int> userWordsIDs = server_ids;
            IEnumerable<int> serverWordsIDs = userWordPairRepository.Get(uwp => uwp.UserID == authorizedID).Select(uwp => uwp.UserWordPairID);

            IEnumerable<int> idsToAdd_OnClient = serverWordsIDs.Except(userWordsIDs);
            IEnumerable<int> idsToDelete_OnClient = userWordsIDs.Except(serverWordsIDs);


            List<WordTranslation> addedWords = new List<WordTranslation>();

            foreach (int id in idsToAdd_OnClient)
            {
                var uwp = await userWordPairRepository.FindById(id);
                var wordpair = await wordPairRepository.FindById(uwp.WordPairID);
                var word1 = await wordRepository.FindById(wordpair.WordForeignID);
                var word2 = await wordRepository.FindById(wordpair.WordNativeID);

                WordTranslation addedWord = new WordTranslation
                {
                    ServerId = id
                };

                if (uwp.IsInvertPair)
                {
                    addedWord.WordNative = word1.Content;
                    addedWord.WordForeign = word2.Content;
                }
                else
                {
                    addedWord.WordNative = word2.Content;
                    addedWord.WordForeign = word1.Content;
                }
                addedWords.Add(addedWord);
            }

            var pullResponce = new PullWordsAnswer
            {
                RemovedServerIds = idsToDelete_OnClient.ToList(),
                AddedWords = addedWords
            };

            return Ok(pullResponce);
        }
    }
}