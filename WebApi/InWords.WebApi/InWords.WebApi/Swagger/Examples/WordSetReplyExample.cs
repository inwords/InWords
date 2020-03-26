using InWords.Protobuf;
using Swashbuckle.AspNetCore.Filters;
using static InWords.Protobuf.WordSetReply.Types;

namespace InWords.WebApi.Swagger.Examples
{
    public class WordSetReplyExample : IExamplesProvider<WordSetReply>
    {
        public WordSetReply GetExamples()
        {
            var wordset1 = new WordSetInfo()
            {
                Description = "Description",
                Id = 1,
                Picture = "https://static.inwords.ru/sets/picture.png",
                Title = "Title"
            };
            var wordset2 = new WordSetInfo()
            {
                Description = "Description 2",
                Id = 2,
                Picture = "https://static.inwords.ru/sets/picture2.png",
                Title = "Title 2"
            };
            var reply = new WordSetReply();
            reply.WordSets.Add(wordset1);
            reply.WordSets.Add(wordset2);
            return reply;
        }
    }
}
