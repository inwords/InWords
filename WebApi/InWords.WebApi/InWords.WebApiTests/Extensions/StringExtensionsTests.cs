using InWords.WebApi.Extensions;
using Xunit;

namespace InWords.WebApiTests.Extensions
{
    public class StringExtensionsTests
    {
        [Theory]
        [InlineData("I-love-tests", "love", "-tests")]
        public void SubstringFromTest(string source, string from, string expected)
        {
            string actual = source.Substring(from);
            Assert.Equal(expected, actual);
        }

        [Theory]
        [InlineData("I-love-tests", "I", "tests", "-love-")]
        // ReSharper disable once TooManyArguments
        public void SubstringFromToTest(string source, string startWith, string endWith, string expected)
        {
            string actual = source.Substring(startWith, endWith);
            Assert.Equal(expected, actual);
        }
    }
}