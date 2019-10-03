using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.FtpLoader.Model
{
    public class FtpCredentials
    {
        public string Server { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
    }
}
