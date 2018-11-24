using InWords.Service.TFA.Controllers;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace InWords.Service.TFA.Tests.Controllers
{
    public class EmailControllerTests
    {
        [Fact]
        public void TestAddRequest()
        {
            var emailController = new EmailController();
            emailController.ConfirmEmail("anzer987@ya.ru");
        }
    }
}
