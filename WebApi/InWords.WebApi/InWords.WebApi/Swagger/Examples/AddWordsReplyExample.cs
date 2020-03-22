using InWords.Protobuf;
using Swashbuckle.AspNetCore.Filters;

namespace InWords.WebApi.Swagger.Examples
{
    public class AddWordsReplyExample : IExamplesProvider<AddWordsReply>
    {
        public AddWordsReply GetExamples()
        {

            var addWords = new AddWordsReply();
            addWords.WordIds.AddRange(new AddWordReply[]
            {
                new AddWordReply() { LocalId = 10,ServerId = 24},
                new AddWordReply() { LocalId = 33,ServerId = 978},
            });
            return addWords;
        }
    }
}
