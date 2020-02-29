using InWords.WebApi.Services.Email.Template;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Email.Abstractions
{
    public interface IEmailTemplateSender
    {
        Task SendMailAsync(string email, EmailTemplateBase emailTemplateBase);
    }
}
