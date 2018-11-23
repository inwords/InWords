using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace InWords.Service.TFA.Models
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
