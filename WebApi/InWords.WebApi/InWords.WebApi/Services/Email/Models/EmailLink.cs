using System;

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
