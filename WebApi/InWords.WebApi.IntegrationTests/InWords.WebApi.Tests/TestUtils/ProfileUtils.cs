using Grpc.Core;
using InWords.Protobuf;
using InWords.WebApiTests.CLI.TestUtils;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using static InWords.Protobuf.Profile;

namespace InWords.WebApi.Tests.TestUtils
{
    public static class ProfileUtils
    {
        public static string GetLogin()
        {
            return $"{Guid.NewGuid().ToString().Replace("-", "").Substring(0, 10)}@testbot";
        }
    }
}
