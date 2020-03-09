using InWords.Data;
using InWords.WebApi.gRPC.Services;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApi.Services.DictionaryService.Words;
using InWords.WebApiTests.TestUtils;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Xunit;

namespace InWords.WebApiTests.Services.DictionaryService.Words
{
    public class AddWordsTests
    {
        [Fact]
        public async void AddUserWordPair()
        {
            // arrange
            int userId = 1;
            int otherId = 2;
            await using InWordsDataContext context = InWordsDataContextFactory.Create();
            await context.AddAccount(userId);
            await context.AddAccount(otherId);
            await context.SaveChangesAsync();

            AddWordsRequest addWordsRequest = new AddWordsRequest();
            addWordsRequest.Words.Add(new AddWordRequest() { LocalId = 0, WordForeign = "0", WordNative = "0-0" });
            addWordsRequest.Words.Add(new AddWordRequest() { LocalId = 2, WordForeign = "2", WordNative = "2-2" });

            // act
            var requestObject = new AuthorizedRequestObject<AddWordsRequest, AddWordsReply>(addWordsRequest)
            {
                UserId = userId
            };

            var registration = new AddWords(context);
            AddWordsReply response = await registration.HandleRequest(requestObject).ConfigureAwait(false);

            // assert 
            Assert.Equal(4, context.Words.Count());
            Assert.Equal(2, context.WordPairs.Count());
            Assert.Equal(2, context.UserWordPairs.Count());

            CheckPairs(addWordsRequest, response, context, userId);
        }

        [Fact]
        public async void AddUserWordPairNoId()
        {
            // arrange
            int userId = 1;
            int otherId = 2;
            await using InWordsDataContext context = InWordsDataContextFactory.Create();
            await context.AddAccount(userId);
            await context.AddAccount(otherId);
            await context.SaveChangesAsync();

            AddWordsRequest addWordsRequest = new AddWordsRequest();
            addWordsRequest.Words.Add(new AddWordRequest() { LocalId = 0, WordForeign = "0", WordNative = "0-0" });
            addWordsRequest.Words.Add(new AddWordRequest() { LocalId = 0, WordForeign = "2", WordNative = "2-2" });

            // act
            var requestObject = new AuthorizedRequestObject<AddWordsRequest, AddWordsReply>(addWordsRequest)
            {
                UserId = userId
            };

            var registration = new AddWords(context);
            AddWordsReply response = await registration.HandleRequest(requestObject).ConfigureAwait(false);

            // assert 
            Assert.Equal(4, context.Words.Count());
            Assert.Equal(2, context.WordPairs.Count());
            Assert.Equal(2, context.UserWordPairs.Count());
            CheckPairs(addWordsRequest, response, context, userId);
        }

        private void CheckPairs(AddWordsRequest request,
            AddWordsReply reply,
            InWordsDataContext context,
            int userId)
        {
            foreach (var result in reply.WordIds)
            {
                var localIdGroup = reply.WordIds.Where(d => d.LocalId == result.LocalId).ToList();
                var userwordpair = context.UserWordPairs.Where(u => u.UserId == userId)
                    .Include(u => u.WordPair)
                    .ThenInclude(wp => wp.WordForeign)
                    .Include(u => u.WordPair.WordNative)
                    .AsEnumerable()
                    .Where(u => localIdGroup.Any(rep => rep.ServerId == u.UserWordPairId));

                foreach (var value in request.Words.Where(d => d.LocalId == result.LocalId))
                {
                    var contains = userwordpair.Any(d => d.IsInvertPair &&
                    d.WordPair.WordForeign.Content == value.WordNative &&
                    d.WordPair.WordNative.Content == value.WordForeign)
                        || userwordpair.Any(d => !d.IsInvertPair &&
                        d.WordPair.WordForeign.Content == value.WordForeign &&
                        d.WordPair.WordNative.Content == value.WordNative);
                    Assert.True(contains);
                }
            }
        }
    }
}
