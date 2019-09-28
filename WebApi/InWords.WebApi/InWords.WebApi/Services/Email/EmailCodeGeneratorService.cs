using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Email
{
    public class ShortCodeGeneratorService
    {
        private readonly Random random;
        public ShortCodeGeneratorService()
        {
            // TODO: Inject Random
            this.random = new Random();
        }
        public int Generate()
        {
            return random.Next(100000, 999999);
        }
    }
}
