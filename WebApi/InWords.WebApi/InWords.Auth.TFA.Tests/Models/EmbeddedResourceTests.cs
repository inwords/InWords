using System;
using System.Collections.Generic;
using System.Text;
namespace InWords.Auth.TFA.Tests.Models
{
    using InWords.Auth.TFA.Models;
    using Xunit;

    public class EmbeddedResourceTests
    {
        public const string RESOURCE = "InWords.Auth.TFA.Resource.EmailConfigTest.security.json";

        [Theory]
        [InlineData(RESOURCE)]
        public string ResourceReadTest(string resourceMame)
        {
            string x = EmbeddedResource.GetApiRequestFile(resourceMame);
            Assert.True(x != null);
            return x;
        }

        [Fact]
        public void JsonConverterTest()
        {
            string x = ResourceReadTest(RESOURCE);
            var config = new StringJsonConverter<EmailConfig>().Convert(x);
            Assert.True(config.Login == "testlogin" && config.Password == "testpassword");
        }
    }
}
