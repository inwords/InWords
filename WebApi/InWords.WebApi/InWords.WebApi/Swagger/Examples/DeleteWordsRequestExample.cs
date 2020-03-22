using InWords.Protobuf;
using Swashbuckle.AspNetCore.Filters;

namespace InWords.WebApi.Swagger.Examples
{
    public class DeleteWordsRequestExample : IExamplesProvider<DeleteWordsRequest>
    {
        public DeleteWordsRequest GetExamples()
        {
            var toDelete = new DeleteWordsRequest();
            toDelete.Delete.AddRange(new int[] { 2, 3, 4, 5 });
            return toDelete;
        }
    }
}
