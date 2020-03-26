using InWords.Data;
using InWords.Data.Enums;
using InWords.Protobuf;
using InWords.WebApi.Services.Abstractions;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using static InWords.Protobuf.WordSetReply.Types;

namespace InWords.WebApi.Modules.WordsSets
{
    public class GetWordSetsHandler
        : AuthorizedRequestObjectHandler<Empty, WordSetReply, InWordsDataContext>
    {
        public GetWordSetsHandler(InWordsDataContext context) : base(context)
        {
        }

        public override async Task<WordSetReply> HandleRequest(
            AuthorizedRequestObject<Empty, WordSetReply> request, CancellationToken cancellationToken = default)
        {
            WordSetReply wordSetReply = new WordSetReply();

            var games = (from tags in Context.GameTags.Where(d => d.Tags == GameTags.Official)
                         join game in Context.Games on tags.GameId equals game.GameId
                         select game);

            var include = await games.Include(d => d.CreationDescriptions)
                .ToArrayAsync()
                .ConfigureAwait(false);

            var wordsSets = include.Select(g =>
            {
                var description = g.CreationDescriptions.Single(d => d.LanguageId == 2);
                return new WordSetInfo()
                {
                    Id = g.GameId,
                    Picture = g.Picture,
                    Title = description.Title,
                    Description = description.Description
                };
            });
            wordSetReply.WordSets.AddRange(wordsSets);

            return wordSetReply;
        }
    }
}
