namespace InWords.Service.Encryption
{
    using System;
    using System.Collections.Generic;
    using System.Text;

    public class SaltProvider : IPasswordDerivator
    {
        public bool IsEquals(string password, string translatedPassword)
        {
            var salt = SaltManager.GetSalt(translatedPassword.ToByteArray());

            var saltedpasswordBytes = SaltPassword(password, salt).ToStringFromByte();

            var translatedPasswordBytes = translatedPassword.ToByteArray();

            bool equals = SaltManager.CompareByteArrays(saltedpasswordBytes, translatedPasswordBytes);

            return equals;
        }

        public string Translate(string password)
        {
            return SaltPassword(password).ToStringFromByte();
        }

        private byte[] SaltPassword(string password, byte[] saltBytes = null)
        {
            var passBytes = password.ToByteArray();

            if (saltBytes == null)
            {
                saltBytes = SaltManager.GenerateSalt();
            }

            var saltedPasswordBytes = SaltManager.GenerateSaltedHash(passBytes, saltBytes);
            return saltedPasswordBytes;
        }
    }
}