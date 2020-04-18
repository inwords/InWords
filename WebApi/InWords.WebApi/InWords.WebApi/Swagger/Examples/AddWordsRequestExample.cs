using InWords.Protobuf;
using Swashbuckle.AspNetCore.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Swagger.Examples
{
    public class AddWordsRequestExample : IExamplesProvider<AddWordsRequest>
    {
        public AddWordsRequest GetExamples()
        {
            AddWordsRequest addWordRequest = new AddWordsRequest();
            AddWordRequest word1 = new AddWordRequest()
            {
                LocalId = 10,
                WordForeign = "Test",
                WordNative = "Тест"
            };
            AddWordRequest word2 = new AddWordRequest()
            {
                LocalId = 24,
                WordForeign = "Test 2",
                WordNative = "Тест 2"
            };
            addWordRequest.Words.Add(word1);
            addWordRequest.Words.Add(word2);
            return addWordRequest;
        }
    }
}
