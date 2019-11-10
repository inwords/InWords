using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.GameWordsToDictionary.ByGameIdUserId
{
    public class GameToUserQueryResult
    {
        /// <summary>
        /// Total words added excluding existing ones
        /// </summary>
        public int WordsAdded { get; set; }
    }
}
