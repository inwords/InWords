using System.Collections.Generic;
using InWords.WebApi.Services.Email.Models;
using Xunit;

namespace InWords.WebApiTests.Services.Email.Models
{
    public class TemplateResolverTest
    {
        [Fact]
        public async void LoadTestTemplateByEnam()
        {
            // preset
            var template = EmailTemplates.TestEmail;
            var expected = "<b>This is {test}</b>";
            // act
            string actual = await TemplateResolver.LoadTemplateAsync(template);
            // test
            Assert.Equal(expected, actual);
        }

        [Fact]
        public async void ReplaceTemplateKeysByDictionary()
        {
            // preset
            var template = EmailTemplates.TestEmail;
            var expected = "<b>This is bar</b>";
            var keyValuePairs = new Dictionary<string, string>
            {
                {"{test}", "bar"}
            };
            // act
            string actual = await TemplateResolver.LoadTemplateAsync(template, keyValuePairs);
            // test
            Assert.Equal(expected, actual);
        }
    }
}