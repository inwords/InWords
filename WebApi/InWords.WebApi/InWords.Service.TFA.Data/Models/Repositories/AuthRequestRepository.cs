// ReSharper disable once CheckNamespace
namespace InWords.Service.TFA.Data
{
    using InWords.Data.Models;
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;
    using System.Text;

    public class AuthRequestRepository : Repository<AuthRequest>
    {
        private readonly TFADataContext context;

        public AuthRequestRepository(TFADataContext context) : base(context)
        {
            this.context = context;
        }
    }
}
