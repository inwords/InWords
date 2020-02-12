using InWords.Data.Domains;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Email.Abstractions
{
    public interface IEmailVerifierService
    {
        Task InstatiateVerifierMessage(User user, string email);
        Task InstatiateVerifierMessage(int userId, string nickname, string email);
    }
}
