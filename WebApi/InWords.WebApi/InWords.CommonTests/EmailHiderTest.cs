using InWords.Common;
using Xunit;

namespace InWords.CommonTests
{
    public class EmailHiderTest
    {
        [Theory]
        [InlineData("asd@mail.ru", "as***@mail.ru")]
        [InlineData("as@mail.ru", "as***@mail.ru")]
        [InlineData("a@mail.ru", "***@mail.ru")]
        [InlineData("@mail.ru", "***@mail.ru")]
        [InlineData("@", "***@***")]
        [InlineData("anonim", "an***@***")]
        [InlineData("@@@", "***@***")]
        [InlineData("", "***@***")]
        public void StandartEmailHideTest(string email, string expected)
        {
            // act
            string actual = EmailHider.Hide(email);
            // assert
            Assert.Equal(expected, actual);
        }
    }
}