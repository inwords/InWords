namespace InWords.Service.Encryption
{
    using System;
    using System.Collections.Generic;
    using System.Text;

    public static class StringExtentions
    {
        public static byte[] ToByteArray(this string password)
        {
            return Convert.FromBase64String(password);
        }

        public static string ToStringFromByte(this byte[] byteArray)
        {
            return Convert.ToBase64String(byteArray);
        }
    }
}
