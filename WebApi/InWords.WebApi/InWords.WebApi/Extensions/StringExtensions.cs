using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Extensions
{
    public static class StringExtensions
    {
        public static string Substring(this string source, string from)
        {
            int indexOfStart = source.IndexOf(from, StringComparison.Ordinal);

            if (indexOfStart < 0) return string.Empty;

            indexOfStart += from.Length;

            return source.Substring(indexOfStart);
        }
    }
}
