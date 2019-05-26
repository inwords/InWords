using System.IO;
using InWords.Data.DTO.GameBox;
using InWords.WebApi.Models.CardGameParser;
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
        }
    }
}
