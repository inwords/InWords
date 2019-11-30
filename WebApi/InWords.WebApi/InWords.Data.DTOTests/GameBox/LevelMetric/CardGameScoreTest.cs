using System;
using System.Collections.Generic;
using System.Text.Json;
using InWords.Data.DTO.GameBox.LevelMetric;
using Xunit;

namespace InWords.Data.DTOTests.GameBox.LevelMetric
{
    public class CardGameScoreTest
    {
        [Fact]
        public void SerializationTest()
        {
            var expected = new LevelMetricQuery
            {
                GameLevelId = 1,
                WordPairIdOpenCounts = new Dictionary<int, int> {{2, 3}}
            };

            Assert.Throws<NotSupportedException>(() => JsonSerializer.Serialize(expected));
            // replace when work and remove Add .AddNewtonsoftJson()
            // just after .AddControllers() / .AddMvc() or any other combination.
            // remove Microsoft.AspNetCore.Mvc.NewtonsoftJson

            //string json = JsonSerializer.Serialize(expected);
            //var actual = JsonSerializer.Deserialize<LevelMetricQuery>(json)
            //Assert.NotNull(actual);
            //Assert.Equal(1, actual.GameLevelId);
            //Assert.NotNull(actual.WordPairIdOpenCounts);
            //Assert.True(actual.WordPairIdOpenCounts.ContainsKey(2));
            //Assert.Equal(3, actual.WordPairIdOpenCounts[2]);
        }
    }
}