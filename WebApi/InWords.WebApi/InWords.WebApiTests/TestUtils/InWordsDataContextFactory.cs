﻿using InWords.Data;
using Microsoft.EntityFrameworkCore;
using System;

namespace InWords.WebApiTests.TestUtils
{
    public static class InWordsDataContextFactory
    {
        public static InWordsDataContext Create()
        {
            DbContextOptions<InWordsDataContext> options = new DbContextOptionsBuilder<InWordsDataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            // Run the test against one instance of the context
            return new InWordsDataContext(options);
        }
    }
}