using System;

namespace InWords.WebApi.Services.Email
{
    public class ShortCodeGeneratorService
    {
        private readonly Random random;

        public ShortCodeGeneratorService()
        {
            // TODO: Inject Random
            random = new Random();
        }

        public int Generate()
        {
            return random.Next(100000, 999999);
        }
    }
}