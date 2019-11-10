using System.Collections.Generic;
using System.Text.Json;
using InWords.Data.DTO;
using Xunit;

namespace InWords.Data.DTOTests
{
    public class PullWordsAnswerTests
    {
        private static void AssertCollectionElement(IEnumerator<WordTranslation> enumerate, WordTranslation addedWord)
        {
            Assert.Equal(enumerate.Current.WordForeign, addedWord.WordForeign);
            Assert.Equal(enumerate.Current.WordNative, addedWord.WordNative);
            Assert.Equal(enumerate.Current.Id, addedWord.Id);
            Assert.Equal(enumerate.Current.ServerId, addedWord.ServerId);
        }

        private static bool IsContainsEnumerator(IEnumerator<WordTranslation> enumerate)
        {
            return enumerate != null && enumerate.Current == null;
        }

        private static PullWordsAnswer SampleCollection()
        {
            return new PullWordsAnswer
            {
                AddedWords = new List<WordTranslation>
                {
                    new WordTranslation("test", "тест"), new WordTranslation("test1", "тест1", 1)
                },
                RemovedServerIds = new List<int> {3, 4}
            };
        }

        [Fact]
        public void ClassSerializeText()
        {
            PullWordsAnswer answer = SampleCollection();

            string json = JsonSerializer.Serialize(answer);
            var actualCAnswer = JsonSerializer.Deserialize<PullWordsAnswer>(json);

            Assert.NotNull(actualCAnswer);
            Assert.NotNull(actualCAnswer.AddedWords);
            Assert.NotNull(actualCAnswer.RemovedServerIds);

            IEnumerator<WordTranslation> enumerate = answer?.AddedWords.GetEnumerator();

            foreach (WordTranslation addedWord in actualCAnswer.AddedWords)
            {
                if (IsContainsEnumerator(enumerate)) continue;
                AssertCollectionElement(enumerate, addedWord);
                enumerate.MoveNext();
            }

            enumerate.Dispose();
        }
    }
}