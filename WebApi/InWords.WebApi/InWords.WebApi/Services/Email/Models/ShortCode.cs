using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Email.Models
{
    public sealed class ShortCode
    {
        public static int Next()
        {
            byte[] array = new Guid().ToByteArray();
            byte[] intSlice = array[0..4];
            int number = Math.Abs(BitConverter.ToInt32(intSlice, 0));
            if (number < 100000)
                number += 100000;
            return number;
        }
    }
}
