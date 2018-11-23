namespace InWords.Auth.TFA
{
    using InWords.Auth.TFA.Interface;
    using InWords.Auth.TFA.Models;
    using RestSharp;
    using RestSharp.Authenticators;
    using System;

    public class MailgunProvider : I2FAProvider
    {

        public const string RESOURCE = "InWords.Auth.TFA.Resource.MailgunConfig.security.json";


        public static IRestResponse SendSimpleMessage(string email)
        {
            EmailApiConfig config = new StringJsonConverter<EmailApiConfig>()
               .Convert(EmbeddedResource.GetApiRequestFile(RESOURCE));

            RestClient client = new RestClient
            {
                BaseUrl = new Uri("https://api.mailgun.net/v3"),
                Authenticator =
                new HttpBasicAuthenticator("api", config.APIKey)
            };

            RestRequest request = new RestRequest();
            request.AddParameter("domain", config.Domain, ParameterType.UrlSegment);
            request.Resource = "{domain}/messages";
            request.AddParameter("from", $"Excited User <mailgun@{config.Domain}>");
            request.AddParameter("to", email);
            //request.AddParameter("to", "YOU@YOUR_DOMAIN_NAME");
            request.AddParameter("subject", "Hello");
            request.AddParameter("text", "Testing some Mailgun awesomness!");
            request.Method = Method.POST;
            return client.Execute(request);
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