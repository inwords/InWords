using System;
using System.Collections.Generic;
using System.Linq;

namespace InWords.Common.Extensions
{
    public static class IEnumerableExtensions
    {
        public static void ForEach<T>(this IEnumerable<T> source, Action<T> action)
        {
            foreach (T item in source)
                action(item);
        }

        public static IEnumerable<TResult> SelectUnion<T, TResult>(this IEnumerable<T> source, params Func<T, TResult>[] func)
        {
            var result = new HashSet<TResult>();
            foreach (var f in func)
            {
                var collection = source.Select(f);
                foreach (var elem in collection)
                {
                    if (result.Contains(elem))
                        continue;

                    result.Add(elem);
                }
            }
            return result;
        }

        public static IDictionary<TKey, TValue> ToDictionary<TKey, TValue>(this IEnumerable<TValue> values,
            Func<TValue, TKey> key,
            Func<IDictionary<TKey, TValue>, TValue, bool> predicate = null)
        {
            var dictionary = new Dictionary<TKey, TValue>();
            values.ForEach(value =>
            {
                TKey valueKey = key(value);
                if (!dictionary.ContainsKey(valueKey))
                {
                    if (predicate == null)
                    {
                        dictionary.Add(valueKey, value);
                    }
                    else if (predicate(dictionary, value))
                    {
                        dictionary.Add(valueKey, value);
                    }
                }
            });
            return dictionary;
        }
    }
}