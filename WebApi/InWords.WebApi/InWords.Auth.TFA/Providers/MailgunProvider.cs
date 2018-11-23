namespace InWords.Auth.TFA
{
    using InWords.Auth.TFA.Interface;
    using InWords.Auth.TFA.Models;
    using RestSharp;
    using RestSharp.Authenticators;
    using System;
    using System.Net;
    using System.Net.Mail;

    public class MailgunProvider : I2FAProvider
    {

        public const string RESOURCE = "InWords.Auth.TFA.Resource.MailgunConfig.security.json";


        public static IRestResponse SendSimpleMessage(string email)
        {
            EmailApiConfig config = new StringJsonConverter<EmailApiConfig>()
               .Convert(EmbeddedResource.GetApiRequestFile(RESOURCE));

            RestClient client = new RestClient
            {
                BaseUrl = new Uri(config.APIUrl),
                Authenticator =
                new HttpBasicAuthenticator("api", config.APIKey)
            };

            RestRequest request = new RestRequest();
            request.AddParameter("domain", config.Domain, ParameterType.UrlSegment);
            request.Resource = "{domain}/messages";
            request.AddParameter("from", $"Excited User <no-reply@{config.Domain}>");
            request.AddParameter("to", email);
            //request.AddParameter("to", config.Login);
            request.AddParameter("subject", "Hello");
            request.AddParameter("text", "Testing some Mailgun awesomness!");
            request.Method = Method.POST;
            return client.Execute(request);
        }

        public static void SendMessageSmtp(string email)
        {
            EmailApiConfig config = new StringJsonConverter<EmailApiConfig>()
             .Convert(EmbeddedResource.GetApiRequestFile(RESOURCE));

            SmtpClient client = new SmtpClient(config.Hostname, config.Port)
            {
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(config.Login, config.Password)
            };

            MailMessage mailMessage = new MailMessage
            {
                From = new MailAddress("no-reply@inwords.ru")
            };
            mailMessage.To.Add(email);
            mailMessage.Body = "Это тестовое сообщение на него не нужно отвечать! Мы стараемся улучшить наши сервисы";
            mailMessage.Subject = "Авторизация";
            client.Send(mailMessage);
        }

        string I2FAProvider.GetKey(string identity)
        {
            throw new NotImplementedException();
        }

        bool I2FAProvider.IsValidKey(string identity, string key)
        {
            throw new NotImplementedException();
        }
    }
}