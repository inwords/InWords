namespace InWords.Service.Encryption.Tests
{
    using InWords.Service.Encryption;
    using System;
    using Xunit;

    public class SaltProviderTests
    {
        public SaltProvider saltProvider = null;
        public SaltProviderTests()
        {
            saltProvider = new SaltProvider();
        }

        [Theory]
        [InlineData("password")]
        public void Translate_HashedReturned(string password)
        {
            string hashed = saltProvider.Translate(password);
            Assert.True(password != null);
        }
    }
}