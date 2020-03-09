﻿using Grpc.Core;
using Grpc.Net.Client;
using InWords.WebApi.Tests.TestUtils;
using InWords.WebApiTest.gRPC.Services;
using InWords.WebApiTests.CLI;
using InWords.WebApiTests.CLI.TestUtils;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;
using static InWords.WebApiTest.gRPC.Services.DictionaryProvider;

namespace InWords.WebApi.Tests.Services.DictionaryService
{
    public class AddWordsTest
    {
        [Fact]
        public void AddOneWord()
        {

            // arrange
            using var clientFabric = new GetClient<DictionaryProviderClient>(d => new DictionaryProviderClient(d));
            DictionaryProviderClient client = clientFabric.Client;
            AddWordsRequest addwordsRequest = new AddWordsRequest();
            AddWordRequest addWordRequest = new AddWordRequest()
            {
                LocalId = 1,
                WordForeign = "cat",
                WordNative = "кот"
            };
            addwordsRequest.Words.Add(addWordRequest);
            // act 
            string token = ProfileUtils.GetTokenForce();
            var headers = new Metadata
            {
                { "Authorization", $"Bearer {token}" }
            };
            var empty = client.AddWords(addwordsRequest, headers);
            // assert
            Assert.Single(empty.WordIds);
            Assert.Equal(1, empty.WordIds[0].LocalId);
        }
    }
}
