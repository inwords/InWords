using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using System.Text.RegularExpressions;

namespace InWords.Tools.GamesDoc
{
    public class GameObjectFilter
    {
        public static void FilterText(string text)
        {
            // find header
            List<int> headers = GetHeaders(text);

            if (headers.Count == 0) return;

            // while not words
            var gamesList = new List<string>();

            for (var i = 0; i < headers.Count - 1; i++)
            {
                int length = headers[i + 1] - headers[i] + 1;
                gamesList.Add(text.Substring(headers[i], length));
            }

            gamesList.Add(text.Substring(headers[headers.Count - 1]));

            // get name 

            // det disk

            // find pairs N) or find Final

            // add pairs split ;

            // if find header repeat

        }

        private static List<int> GetHeaders(string doc)
        {
            var headers = new List<int>();
            var gameRex = new Regex(@"\d\."); ;
            MatchCollection matchCollection = gameRex.Matches(doc);
            foreach (Match m in matchCollection)
            {
                headers.Add(m.Index);
            }

            return headers;
        }
    }
}
