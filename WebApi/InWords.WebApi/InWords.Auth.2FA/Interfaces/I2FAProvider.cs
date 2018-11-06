namespace InWords.Auth.TFA.Interface
{
    using System;
    using System.Collections.Generic;
    using System.Text;

    interface I2FAProvider
    {
        string GetKey(string identity);

        bool IsValidKey(string identity, string key);
    }
}
