using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace InWords.Service.Encryption
{
    public class SaltManager
    {
        public static byte[] GenerateSaltedHash(byte[] plainText, byte[] salt)
        {
            HashAlgorithm algorithm = new SHA256Managed();

            var plainTextWithSaltBytes = plainText.Concat(salt);

            return algorithm.ComputeHash(plainTextWithSaltBytes.ToArray());
        }

        public static bool CompareByteArrays(byte[] array1, byte[] array2)
        {
            return array1.Length == array2.Length && !array1.Where((t, i) => t != array2[i]).Any();
        }

        public static byte[] GenerateSalt()
        {
            var saltBytes = new byte[16];
            using (var rnd = RandomNumberGenerator.Create())
            {
                rnd.GetBytes(saltBytes);
            }
            return saltBytes;
        }

        public static byte[] GetSalt(byte[] saltedText)
        {
            return saltedText.Skip(saltedText.Length - 16).ToArray();
        }
    }
}