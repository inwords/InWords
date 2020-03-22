using InWords.Protobuf;
using Swashbuckle.AspNetCore.Filters;

namespace InWords.WebApi.Swagger.Examples
{
    public class WordSetWordsReplyExample : IExamplesProvider<WordSetWordsReply>
    {
        public WordSetWordsReply GetExamples()
        {
            var reply = new WordSetWordsReply();
            var words = new WordSetWord[]
            {
                new WordSetWord() { HasAdded = true, WordForeign = "foreign", WordNative = "native", WordPairId = 123 },
                new WordSetWord() { HasAdded = false, WordForeign = "test", WordNative = "тест", WordPairId = 417 },
            };
            reply.Words.AddRange(words);
            return reply;
        }
    }
}
