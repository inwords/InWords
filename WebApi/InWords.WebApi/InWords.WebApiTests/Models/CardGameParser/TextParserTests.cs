using InWords.Data.DTO.GameBox;
using InWords.WebApi.Models.CardGameParser;
using System.IO;
using Xunit;

namespace InWords.WebApiTests.Models.CardGameParser
{
    public class TextParserTests
    {
        public static string GetSource(string filename)
        {
            return null;
        }

        [Theory]
        [InlineData("test1.txt")]
        public void ReadFirstGame(string filename)
        {
            string source = File.ReadAllText(filename);
            var parser = new TextParser(source);
            GamePack gameObject = parser.GetGameObject(1);
            Assert.Equal("Ктo?", gameObject.CreationInfo.Descriptions[0].Title);
            Assert.Equal(
                "Вчера кто-то из бросминожек украл мои чернила! Ты поможешь мне узнать, кто это сделал? (местоимения)",
                gameObject.CreationInfo.Descriptions[0].Description);
            Assert.Equal("Who?",
                gameObject.CreationInfo.Descriptions[1].Title);
            Assert.Equal(5, gameObject.LevelPacks.Count);
            Assert.Equal(5, gameObject.LevelPacks[4].Level = 5);
            Assert.Equal(11, gameObject.LevelPacks[4].WordTranslations.Count);
            Assert.Equal("I", gameObject.LevelPacks[4].WordTranslations[0].WordForeign);
            Assert.Equal("я", gameObject.LevelPacks[4].WordTranslations[0].WordNative);
        }
    }
}