using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InWords.Data.Models;
using InWords.Data.Models.InWords.Repositories;

namespace InWords.WebApi.Services.GameService
{
    public abstract class BaseGameService : ServiceBase
    {
        protected readonly UserRepository UserRepository;
        protected readonly GameBoxRepository GameBoxRepository;
        protected readonly GameLevelRepository GameLevelRepository;
        protected readonly GameLevelWordRepository GameLevelWordRepository;

        protected BaseGameService(InWordsDataContext context) : base(context)
        {
            UserRepository = new UserRepository(context);
            GameBoxRepository = new GameBoxRepository(context);
            GameLevelRepository = new GameLevelRepository(context);
            GameLevelWordRepository = new GameLevelWordRepository(context);
        }
    }
}