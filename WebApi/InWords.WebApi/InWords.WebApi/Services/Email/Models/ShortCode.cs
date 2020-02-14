using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Email.Models
{
    public sealed class ShortCode
    {
        public const int MAX = 999999;
        public const int MIN = 100000;
        public static int Next()
        {
            byte[] array = Guid.NewGuid().ToByteArray();
            byte[] intSlice = array[0..4];
            int number = Math.Abs(BitConverter.ToInt32(intSlice, 0)) % MAX;
            if (number < 100000) 
                number += MIN;
            return number;
        }
    }
}
