using System;
using System.Collections.Generic;
using System.Text;
namespace InWords.Auth.TFA.Tests.Models
{
    using InWords.Auth.TFA.Models;
    using Xunit;

    public class EmbeddedResourceTests
    {
        [Theory]
        [InlineData("InWords.Auth.TFA.Resource.EmailConfig.security.json")]
        public void ResourceReadTest(string resourceMame)
        {
            var x = EmbeddedResource.GetApiRequestFile(resourceMame);
            Assert.True(x != null);
        }
    }
}
