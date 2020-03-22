using InWords.Protobuf;
using Swashbuckle.AspNetCore.Filters;
using static InWords.Protobuf.UpdateWordsRequest.Types;

namespace InWords.WebApi.Swagger.Examples
{
    public class UpdateWordsRequestExample : IExamplesProvider<UpdateWordsRequest>
    {
        public UpdateWordsRequest GetExamples()
        {
            var update = new UpdateWordsRequest();
            update.Update.Add(new UpdateWordRequest()
            {
                Delete = 23,
                LocalId = 10,
                WordForeign = "word",
                WordNative = "cлово"
            });
            update.Update.Add(new UpdateWordRequest()
            {
                Delete = 243,
                LocalId = 33,
                WordForeign = "wood",
                WordNative = "дерево"
            });
            return update;
        }
    }
}
