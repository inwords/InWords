using InWords.WebApi.Services.Email.Models;
using Xunit;

namespace InWords.WebApiTests.Services.Email.Models
{
    public class ShortCodeTest
    {
        [Fact]
        public void TestCode()
        {
            // arrange
            int max = ShortCode.MAX;
            int min = ShortCode.MIN;
            int generatedCode = ShortCode.Next();
            // act
            bool isInRange = generatedCode <= max && generatedCode >= min;
            // assert
            Assert.True(isInRange);
        }
    }
}
