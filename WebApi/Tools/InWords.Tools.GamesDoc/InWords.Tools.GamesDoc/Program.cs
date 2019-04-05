using System;

namespace InWords.Tools.GamesDoc
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");

            // open dock
            string doc = DocsStartup.Invoke();
            Console.WriteLine(doc);

            // parse to object //var object = FilterText(dic)
            GameObjectFilter.FilterText(doc);

            // load object

            // find different  

            // push
        }
    }
}
