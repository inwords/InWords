﻿using InWords.Data.Creations.GameBox;
using InWords.Data.Domains.EmailEntitys;
using Microsoft.EntityFrameworkCore;

namespace InWords.Data
{
    public partial class InWordsDataContext
    {
        public DbSet<EmailVerifier> EmailVerifies { get; set; }
    }
}