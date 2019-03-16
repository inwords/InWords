namespace InWords.Service.TFA.Models
{
    public class EmailConfig
    {
        public string Login { get; set; }
        public string Password { get; set; }
        public string SmtpServer { get; set; }
        public int Port { get; set; }
    }
}