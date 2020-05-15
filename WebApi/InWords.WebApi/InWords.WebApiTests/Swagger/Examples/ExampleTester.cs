using Swashbuckle.AspNetCore.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using Xunit;

namespace InWords.WebApiTests.Swagger.Examples
{
    public class ExampleTester
    {
        [Fact]
        public void Example_ReturnNotNullValue()
        {
            IEnumerable<dynamic> examples = from t in Assembly.GetExecutingAssembly().GetTypes()
                                            where t.FullName.Contains("InWords.WebApi.Swagger.Examples")
                                                     && t.GetConstructor(Type.EmptyTypes) != null
                                            select Activator.CreateInstance(t);

            foreach (var example in examples)
            {
                var objectExample = example.GetExamples();
                Assert.NotNull(objectExample);
            }
        }
    }
}
