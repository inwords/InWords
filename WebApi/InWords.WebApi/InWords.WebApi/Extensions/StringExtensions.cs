using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
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

        public static string[] RemoveEmpty(this IEnumerable<string> source)
        {
            return source.Where(s => !string.IsNullOrEmpty(s)).ToArray();
        }

        public static string Replace(this string source, Dictionary<string, string> keyValues)
        {
            // TODO: optimize to more performance
            foreach (KeyValuePair<string, string> keyValuePair in keyValues)
            {
                source = source.Replace(keyValuePair.Key, keyValuePair.Value);
            }
            return source;
        }

        /// <summary>
        /// This is to get raw text inside html/xml tags
        /// </summary>
        /// <param name="source"></param>
        /// <returns></returns>
        public static string StripHTML(this string input)
        {
            return Regex.Replace(input, "<.*?>", String.Empty);
        }
    }
}
