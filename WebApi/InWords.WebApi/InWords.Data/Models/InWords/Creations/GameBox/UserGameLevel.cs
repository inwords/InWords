﻿// ReSharper disable once CheckNamespace

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InWords.Data.Models.InWords.Creations.GameBox
{
    public class UserGameLevel
    {
        [Key] public int UserGameLevelId { get; set; }

        public int UserGameBoxId { get; set; }

        [ForeignKey(nameof(UserGameBoxId))] public virtual UserGameBox UserGameBox { get; set; }

        public int GameLevelId { get; set; }

        [ForeignKey(nameof(GameLevelId))] public virtual GameLevel GameLevel { get; set; }

        public int UserStars { get; set; }
    }
}