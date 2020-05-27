﻿using InWords.Data.Creations;
using InWords.Data.Creations.GameBox;
using InWords.Data.Domains.Game;
using Microsoft.EntityFrameworkCore;

namespace InWords.Data
{
    public partial class InWordsDataContext
    {
        public DbSet<GameLevel> GameLevels { get; set; }
        public DbSet<GameTag> GameTags { get; set; }

        public DbSet<GameLevelWord> GameLevelWords { get; set; }

        public DbSet<UserGameLevel> UserGameLevels { get; set; }
        public DbSet<Historylevel> Historylevels { get; set; }
    }
}