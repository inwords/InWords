using InWords.WebApi.Prometheus;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace InWords.WebApiTests.Prometheus
{
    public class ResponseMetricMiddlewareTests
    {
        [Theory]
        [InlineData("/v2/WordSet/estimate", "/v2/wordset/estimate")]
        [InlineData("/v2/WordSet/estimate/", "/v2/wordset/estimate")]
        [InlineData("/v2/WordSet/estimate/toberemoved", "/v2/wordset/estimate")]
        [InlineData("/Auth.v2.WordSet/estimate/toberemoved", "/auth.v2.wordset/estimate")]
        public void TestPath(string path, string expected)
        {
            string actual = ResponseMetricMiddleware.MetricPathTrimmer(path);
            Assert.Equal(expected, actual);
        }
    }
}
