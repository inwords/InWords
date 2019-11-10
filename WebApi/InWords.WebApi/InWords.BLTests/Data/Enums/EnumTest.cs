using InWords.Data.Enums;
using Xunit;

namespace InWords.BLTests.Data.Enums
{
    public class EnumTest
    {
        [Fact]
        public void EnumToStringTest()
        {
            // prep
            var expected = "Admin";
            var fooBar = RoleType.Admin;

            // act
            string nameOfString = nameof(RoleType.Admin);
            string toStringString = fooBar.ToString();
            string interpString = $"{RoleType.Admin}";

            // compare
            Assert.Equal(expected, nameOfString);
            Assert.Equal(expected, toStringString);
            Assert.Equal(expected, interpString);
        }
    }
}