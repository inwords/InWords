using System.Runtime.InteropServices;

namespace InWords.Domain
{
    public static class GameLogic
    {
        [DllImport(@"InWords.Shared.dll", EntryPoint = "GameScore", CallingConvention = CallingConvention.StdCall)]
        public static extern int GameScore(int wordsCount, int openingQuantity);
    }
}