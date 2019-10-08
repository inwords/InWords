namespace InWords.WebApi.Services.Email.Models
{
    public class EmailIdentity
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Host { get; set; }
        public int Port { get; set; }
        public bool UseSsl { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
    }
}