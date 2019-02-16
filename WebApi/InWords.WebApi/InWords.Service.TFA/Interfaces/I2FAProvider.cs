namespace InWords.Service.TFA
{
    using System.Threading.Tasks;

    interface I2FAProvider
    {
        Task<string> GetKey(string identity);

        Task<bool> IsValidKey(string identity, string key);
    }
}
