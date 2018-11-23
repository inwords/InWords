namespace InWords.Service.TFA
{
    interface I2FAProvider
    {
        string GetKey(string identity);

        bool IsValidKey(string identity, string key);
    }
}
