namespace InWords.Service.Encryption.Tests
{
    using InWords.Service.Encryption;
    using System;
    using Xunit;

    public class SaltManagerTests
    {
        public SaltManager saltProvider = null;
        public SaltManagerTests()
        {
            saltProvider = new SaltManager();
        }

        [Theory]
        [InlineData("password")]
        public void SaltPassword_saltedKeyReturnd(string password)
        {
            byte[] hashed = saltProvider.SaltPassword(password);
            Assert.True(hashed.Length == 128);
        }

        [Theory]
        [InlineData("password")]
        [InlineData("МойОмегасложный12#4235#ПаSDx%;№рольNaRasnihYazikagh")]
        public void EqualsSequenceSelfCheck_TrueReturned(string password)
        {
            byte[] saltedkey = saltProvider.SaltPassword(password);
            bool equals = saltProvider.EqualsSequence(password, saltedkey);
            Assert.True(equals);
        }

        [Theory]
        [InlineData("password", "otherpassword")]
        public void EqualsSequencePairs_FalsReturned(string password, string otherpassword)
        {
            if (password == otherpassword)
                throw new ArgumentException("Use different passwords in this theory");

            byte[] saltedkey = saltProvider.SaltPassword(password);
            bool equals = saltProvider.EqualsSequence(otherpassword, saltedkey);
            Assert.False(equals);
        }
    }
}