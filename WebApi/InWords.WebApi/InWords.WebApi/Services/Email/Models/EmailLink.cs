using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Email.Models
{
    public sealed class EmailLink
    {
        public static string Next()
        {
            return $"{Guid.NewGuid()}";
        }
    }
}
