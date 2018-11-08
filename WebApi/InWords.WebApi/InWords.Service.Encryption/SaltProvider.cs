namespace InWords.Service.Encryption
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;

    public class SaltProvider : IPasswordDerivator
    {
        public bool IsEquals(string password, string translatedPassword)
        {
            //bool equals = SaltManager.ConfirmPassword(password, translatedPassword);

            return true;
        }

        public string Translate(string password)
        {
            return SaltManager.SaltPassword(password);
        }
    }
}