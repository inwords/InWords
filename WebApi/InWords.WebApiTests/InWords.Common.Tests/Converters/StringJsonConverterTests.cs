using System;
using System.Collections.Generic;
using System.Text;

namespace InWords.Common.Tests.Converters
{
    using System.Reflection;
    using Xunit;

    public class StringJsonConverterTests
    {
        [Fact]
        public void JsonConverterTest()
        {
            var numbers = "[0, 1, 2, 3]";
            int[] array = new StringJsonConverter<int[]>().Convert(numbers);
            Assert.True(array[0] == 0 && array[3] == 3);
        }
    }
}
