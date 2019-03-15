using Newtonsoft.Json;

namespace InWords.Common.Converters
{
    public class StringJsonConverter<T> where T : class
    {
        public T Convert(string jsonString)
        {
            T tmp = JsonConvert.DeserializeObject<T>(jsonString);
            return tmp;
        }
    }
}
