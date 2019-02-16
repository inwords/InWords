namespace InWords.Common.Tests.Providers
{
    using Xunit;

    /// <summary>
    /// NEED TO BE REBASE
    /// </summary>
    public class EmbeddedResourceTests
    {
        public const string RESOURCE = "InWords.Auth.TFA.Resource.EmailConfigTest.security.json";

        /// <summary>
        /// This is need to be refactored
        /// </summary>
        /// <param name="resourceMame"></param>
        /// <returns></returns>
        [Theory]
        [InlineData(RESOURCE)]
        public string ResourceReadTest(string resourceMame)
        {
            string x = null;
            //x = EmbeddedResource.GetApiRequestFile(resourceMame, );
            //maybe Resourceneed to return object value?
            Assert.True(x != null);
            return x;
        }
    }
}
