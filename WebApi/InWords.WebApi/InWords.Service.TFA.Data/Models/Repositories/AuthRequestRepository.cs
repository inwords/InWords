using InWords.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace InWords.Service.TFA.Data
{
    public class AuthRequestRepository : Repository<AuthRequest>
    {
        public AuthRequestRepository(TFADataContext context) : base(context)
        {
        }
    }
}
