using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Extensions
{
    public static class StringExtensions
    {
        public static string Substring(this string source, string startWith)
        {
            int indexOfStart = source.IndexOf(startWith, StringComparison.Ordinal);

            if (indexOfStart < 0) return string.Empty;

            indexOfStart += startWith.Length;

            return source.Substring(indexOfStart);
        }

        public static string Substring(this string source, string startWith, string endWith)
        {
            if (!string.IsNullOrEmpty(startWith))
                source = source.Substring(startWith);

            if (string.IsNullOrEmpty(source)) return string.Empty;

            int indexOfEnd = source.IndexOf(endWith, StringComparison.Ordinal);

            return indexOfEnd < 0 ? string.Empty : source.Substring(0, indexOfEnd);
        }
    }
}
