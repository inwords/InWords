using InWords.Data.Domains;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.DictionaryService.Extentions
{
    public static class WordExtentions
    {
        public static void AddWords(this DbSet<Word> words, IEnumerable<Word> resource)
        {
            if (words == null)
                throw new ArgumentNullException($"{nameof(words)} is null");

            var contentDictionary = (from word in resource
                                     group word by word.Content into wordsContent
                                     select wordsContent).ToDictionary(wc => wc.Key, wk => wk.First());


            var existedWords = words.Where(w => contentDictionary.Keys.Any(d => d.Equals(w.Content))).ToList();

            foreach (var word in existedWords)
            {
                contentDictionary[word.Content].WordId = word.WordId;
            }

            var wordsToAdd = contentDictionary.Where(d => existedWords.All(w => w.Content != d.Key)).Select(d => d.Value);

            words.AddRange(wordsToAdd);
        }
    }
}
