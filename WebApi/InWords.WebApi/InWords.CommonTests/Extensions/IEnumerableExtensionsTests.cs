using InWords.Common.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Xunit;

namespace InWords.CommonTests.Extensions
{
    public class IEnumerableExtensionsTests
    {

        [Fact]
        public void SelectUnionNumbersSingleField()
        {
            // arrange
            var fieldsObject = new List<Tuple<int, int>>
            {
                new Tuple<int, int>(1, 1),
                new Tuple<int, int>(2, 2),
                new Tuple<int, int>(3, 4)
            };
            int[] expected = { 1, 2, 3, 4 };
            // act
            var actual = fieldsObject.SelectUnion(d => d.Item1, v => v.Item2).ToArray();
            // assert
            Assert.Equal(expected, actual);
        }
    }
}
