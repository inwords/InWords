﻿namespace InWords.Data.Models
{
    using System.Linq;

    public class UserGameLevelRepository : Repository<UserGameLevel>
    {
        public UserGameLevelRepository(InWordsDataContext context) : base(context) { }
    }
}
