using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Email
{
    public class EmailPasswordResetService
    {
        //IResetPasswordEmail resetPasswordEmail;
        public EmailPasswordResetService()
        {

        }

        // By email, send token and guid 
        public void SendResetPasswordMail(string email)
        { 
            // send email
            //EmailSender.Send(resetPasswordEmail,email);
            // write repo
        }

        // By link guid set new password
        public void UpdatePassword(string guid, string password)
        {
            // find in repo
            // delete if exist
            // update password
        }

        // By email and key set new password
        public void UpdatePassword(string email, int key, string password)
        {
            // find in repo
            // delete if exist
            // update password
        }
    }
}
