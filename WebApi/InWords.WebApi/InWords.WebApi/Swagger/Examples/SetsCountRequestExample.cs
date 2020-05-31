using InWords.Protobuf;
using Swashbuckle.AspNetCore.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Swagger.Examples
{
    public class SetsCountRequestExample : IExamplesProvider<SetsCountRequest>
    {
        public SetsCountRequest GetExamples()
        {
            return new SetsCountRequest()
            {
                Offset = 0,
                Limit = 50,
            };
        }
    }
}
