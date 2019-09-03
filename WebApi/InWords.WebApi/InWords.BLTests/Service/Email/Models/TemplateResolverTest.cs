using InWords.WebApi.Services.Email.Models;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace InWords.BLTests.Service.Email.Models
{
    public class TemplateResolverTest
    {
        [Fact]
        public async void LoadTestTemplateByEnam()
        {
            // preset
            EmailTemplates template = EmailTemplates.TestEmail;
            string expected = "<b>This is {test}</b>";
            TemplateResolver resolver = new TemplateResolver();

            // act
            string actual = await resolver.LoadTemplate(template);
            // test
            Assert.Equal(expected, actual);
        }

        [Fact]
        public async void ReplaceTemplateKeysByDictionary()
        {
            // preset
            EmailTemplates template = EmailTemplates.TestEmail;
            string expected = "<b>This is bar</b>";
            TemplateResolver resolver = new TemplateResolver();
            Dictionary<string, string> keyValuePairs = new Dictionary<string, string>()
            {
                {"{test}","bar" }
            };
            // act
            string actual = await resolver.LoadTemplate(template, keyValuePairs);
            // test
            Assert.Equal(expected, actual);
        }
    }
}
