using System;
using System.Collections.Generic;
using System.Text;

namespace InWords.WebApiTests.CLI
{
    public enum Variables
    {
        URL
    }

    public static class TestEnvironment
    {
        public static string GetEnvironmentVariable(Variables variables)
        {
            return Environment.GetEnvironmentVariable(variables.ToString());
        }
    }
}
