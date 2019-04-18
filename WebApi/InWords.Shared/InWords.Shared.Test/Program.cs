using System;
using System.Runtime.InteropServices;

namespace InWords.Shared.Test
{
    class Program
    {
        //C:\Users\aasle\YandexDisk\!Source\InWords\WebApi\InWords.Shared\x64\Debug

        [DllImport(@"InWords.Shared.dll",
            EntryPoint = "GameScore", CallingConvention = CallingConvention.StdCall)]
        public static extern int GameScore(int wordsCount, int openingQuantity);

        static void Main(string[] args)
        {
            int result = GameScore(32, 64);
            Console.WriteLine("result is {0}", result);
            //Halts the program
            Console.ReadKey();
        }
    }
}
