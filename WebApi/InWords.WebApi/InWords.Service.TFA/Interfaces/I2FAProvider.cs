using System.Threading.Tasks;

namespace InWords.Service.TFA.Interfaces
{
    internal interface I2FAProvider
    {
        Task<string> GetKey(string identity);

        Task<bool> IsValidKey(string identity, string key);
    }
}