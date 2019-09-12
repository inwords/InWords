using InWords.WebApi.Services.UserWordPairService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.UserWordPairService.Abstraction
{
    public abstract class KnowledgeLicenseProvider
    {
        public abstract KnowledgeLicense Grant(KnowledgeLicense knowledgeLicense);
    }
}
