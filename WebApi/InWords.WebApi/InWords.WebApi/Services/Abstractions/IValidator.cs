using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Email.Abstractions
{
    public interface IValidator
    {
        bool IsValid();
    }
}
