﻿using System;
using InWords.Service.Encryption;
using Xunit;

namespace InWords.Service.EncryptionTests
{
    public class SaltGeneratorTestSaltGeneratorTest
    {
        [Theory]
        [InlineData("123")]
        [InlineData("パスワード")]
        [InlineData("")]
        [InlineData(" ")]
        public void EqualsSequence(string password)
        {
            var saltGenerator = new SaltGenerator();
            byte[] key = saltGenerator.SaltPassword(password);
            bool result = saltGenerator.EqualsSequence(password, key);
            Assert.True(result);
        }

        [Fact]
        public void EqualsSequenceNull()
        {
            var saltGenerator = new SaltGenerator();
            Assert.Throws<ArgumentNullException>(() => saltGenerator.SaltPassword(null));
        }

        [Fact]
        public void EqualsSequenceBig()
        {
            string password = new string(';', 2048);
            var saltGenerator = new SaltGenerator();
            byte[] key = saltGenerator.SaltPassword(password);
            bool result = saltGenerator.EqualsSequence(password, key);
            Assert.True(result);
        }
    }
}
