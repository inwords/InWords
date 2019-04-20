using InWords.Transfer.Data.Models;
using InWords.Transfer.Data.Models.GameBox;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Abstractions
{
    public interface IGameService
    {
        Task<SyncBase> AddGamePack(int userId, GamePack gamePack);
        Task<List<GameInfo>> GetGames();
        Task<GamePack> GetGame(int userId, int gameId);
        Level GetLevel(int userId, int levelId);
        Task<int> DeleteGames(params int[] gameId);
        Task<int> DeleteOwnGames(int userId, params int[] gameId);
    }
}
