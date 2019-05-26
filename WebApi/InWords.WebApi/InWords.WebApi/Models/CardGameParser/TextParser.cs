using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InWords.Data.DTO;
using InWords.Data.DTO.Creation;
using InWords.Data.DTO.GameBox;
using InWords.WebApi.Extensions;

namespace InWords.WebApi.Models.CardGameParser
{
    public class TextParser
    {

        private const string FINAL_LEVEL_MARK = "Итоговый:";
        private const string THEME_MARK = "#Тема";
        private const string WORDS_SPLIT = ";";

        private readonly string source;

        public TextParser(string source)
        {
            this.source = source;
        }

        public GamePack GetGameObject(int themeNumber)
        {
            string[] themes = source.Split(THEME_MARK);

            string theme = GetThemByNumber(themes, themeNumber);

            return string.IsNullOrEmpty(theme) ? null : ParseTheme(theme);
        }

        private static int GetThemeNumber(string theme)
        {
            string potentialNumber = theme.Substring(" ", " ");
            if (int.TryParse(potentialNumber, out int result))
                return result;
            else
                return -1;
        }

        private static string GetThemByNumber(IEnumerable<string> themes, int number)
        {
            return themes.FirstOrDefault(theme => GetThemeNumber(theme).Equals(number));
        }

        private static GamePack ParseTheme(string theme)
        {
            var gamePack = new GamePack
            {
                CreationInfo = GetCreationInfo(theme),
                LevelPacks = GetGamePack(theme)
            };
            return gamePack;
        }

        private static CreationInfo GetCreationInfo(string theme)
        {
            string[] themeInfos = theme.Substring(":", "1.").Split(Environment.NewLine);
            themeInfos = themeInfos.Where(ti => ti.Length > 0).Select(tit => tit.TrimStart(' ').TrimEnd(' ')).ToArray();

            var creationInfo = new CreationInfo
            {
                CreatorId = 0,
                Descriptions = new List<DescriptionInfo>
                {
                    new DescriptionInfo { Title = themeInfos[0], Description = themeInfos[1] },
                    new DescriptionInfo { Title = themeInfos[2], Description = themeInfos[3] }
                }
            };
            return creationInfo;
        }

        private static List<LevelPack> GetGamePack(string theme)
        {
            // TODO: Start refactor here!!!!!!!1
            var levelPacks = new List<LevelPack>();
            var level = new LevelPack();
            int levelNum = 0;

            theme = "1." + theme.Substring("1.");
            string[] wordPairStrings = theme.Split(Environment.NewLine);

            //if start with num
            foreach (string wordsPairString in wordPairStrings)
            {
                string wordsPairStringClear = wordsPairString;
                if (char.IsDigit(wordsPairString[0]))
                {
                    levelNum++;
                    levelPacks.Add(level);
                    level = new LevelPack { WordTranslations = new List<WordTranslation>() };
                    wordsPairStringClear = wordsPairString.Substring(".");
                }
                else if (wordsPairStringClear.Equals(FINAL_LEVEL_MARK))
                {
                    levelNum++;
                    levelPacks.Add(level);
                    level = new LevelPack { WordTranslations = new List<WordTranslation>() };
                    wordsPairStringClear = "";
                }

                var wordSplit = wordsPairStringClear.Split(WORDS_SPLIT);
                if (wordSplit.Length == 2)
                {
                    var wordTranslation = new WordTranslation
                    {
                        WordForeign = wordSplit[0],
                        WordNative = wordSplit[1]
                    };
                    level.WordTranslations.Add(wordTranslation);
                }
            }
            //if Итоговый:
            //else if words

            return null;
        }
    }
}
