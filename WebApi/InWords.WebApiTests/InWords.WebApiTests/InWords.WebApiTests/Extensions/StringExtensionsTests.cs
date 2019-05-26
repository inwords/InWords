using Xunit;
using InWords.WebApi.Extensions;

namespace InWords.WebApiTests.Extensions
{
    public class StringExtensionsTests
    {
        [Theory]
        [InlineData("I love tests","love"," tests")]
        public void SubstringFromTest(string source, string from, string result)
        {
            source.Substring(from);

        }
    }
}
