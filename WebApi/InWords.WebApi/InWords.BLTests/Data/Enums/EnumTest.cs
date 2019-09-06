using InWords.Data.Enums;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace InWords.BLTests.Data.Enums
{
    public class EnumTest
    {
        [Fact]
        public void EnumToStringTest()
        {
            // prep
            string expected = "Admin";
            RoleType fooBar = RoleType.Admin;
            
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
