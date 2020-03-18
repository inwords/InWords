using InWords.Protobuf;
using Microsoft.AspNetCore.Mvc.Formatters;
using Swashbuckle.AspNetCore.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
