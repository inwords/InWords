using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InWords.Data.DTO.GameBox;

namespace InWords.WebApi.Models.CardGameParser
{
    public class TextParser
    {
        private readonly string source;

        public TextParser(string source)
        {
            this.source = source;
        }

        public GameObject GetGameObject(int themeNumber)
        {
            var themes = source.Split("#Тема");
            return null;
        }

        private void ParseTheme(string source)
        {
            //string themeName = source.Substring(":",)
        }
    }
}
