using Newtonsoft.Json;

namespace InWords.Common.Converters
{
    public class StringJsonConverter<T> where T : class
    {
        public T Convert(string jsonString)
        {
            var tmp = JsonConvert.DeserializeObject<T>(jsonString);
            return tmp;
        }
    }
}