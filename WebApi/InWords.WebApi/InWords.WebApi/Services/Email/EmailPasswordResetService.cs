using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Email
{
    public class EmailPasswordResetService
    {

        public EmailPasswordResetService()
        {

        }

        // By email, send token and guid 
        public void SendResetPasswordMail(string email)
        {

        }

        // By link guid set new password
        public void UpdatePassword(string guid, string password)
        {

        }

        // By email and key set new password
        public void UpdatePassword(string email, int key, string password)
        {

        }

    }
}
