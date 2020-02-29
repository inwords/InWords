using InWords.Data.DTO;
using InWords.Data.DTO.Creation;
using InWords.Data.DTO.GameBox;
using InWords.WebApi.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;

namespace InWords.WebApi.Models.CardGameParser
{
    public class TextParser
    {
        private const string THEME_MARK = "#Тема:";
        private const string LEVEL_SPLIT = "#Уровень:";
        private const string WORDS_SPLIT = ";";


        private readonly string source;

        public TextParser(string source)
        {
            this.source = source;
        }

        public GamePack GetGameObject(int themeNumber)
        {
            string[] themes = source.Split(THEME_MARK).RemoveEmpty();

            string theme = GetThemByNumber(themes, themeNumber);

            return string.IsNullOrEmpty(theme) ? null : ParseTheme(theme);
        }

        private static int GetThemeNumber(string theme)
        {
            string potentialNumber = theme.Substring("", Environment.NewLine);
            if (int.TryParse(potentialNumber, out int result))
                return result;
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
                LevelPacks = GetLevelPacks(theme)
            };
            return gamePack;
        }

        private static CreationInfo GetCreationInfo(string theme)
        {
            string[] themeInfos = theme.Split(Environment.NewLine).RemoveEmpty();
            ;
            themeInfos = themeInfos.Select(tit => tit.Trim(' ')).ToArray();

            var creationInfo = new CreationInfo
            {
                CreatorId = 0,
                Descriptions = new List<DescriptionInfo>
                {
                    new DescriptionInfo {Title = themeInfos[1], Description = themeInfos[2], LangId = 2},
                    new DescriptionInfo {Title = themeInfos[3], Description = themeInfos[4], LangId = 1}
                }
            };
            return creationInfo;
        }

        private static List<LevelPack> GetLevelPacks(string theme)
        {
            string[] levelSources = (LEVEL_SPLIT + theme.Substring(LEVEL_SPLIT))
                .Split(LEVEL_SPLIT)
                .RemoveEmpty();
            ;
            var levelPacks = new List<LevelPack>();

            foreach (string levelSource in levelSources) levelPacks.Add(GetLevelPack(levelSource));

            LevelPack lastLevelPack = levelPacks.Single(l => l.Level == 0);
            lastLevelPack.Level = levelPacks.Count;
            return levelPacks;
        }

        private static LevelPack GetLevelPack(string source)
        {
            var levelPack = new LevelPack();
            string[] sourceLines = source.Split(Environment.NewLine).RemoveEmpty();
            if (int.TryParse(sourceLines[0], out int level)) levelPack.Level = level;
            levelPack.WordTranslations = new List<WordTranslation>();
            foreach (string wordTranslationString in sourceLines)
                if (TryParseWordTranslation(wordTranslationString, out WordTranslation wordTranslation))
                    levelPack.WordTranslations.Add(wordTranslation);
            return levelPack;
        }

        private static bool TryParseWordTranslation(string source, out WordTranslation wordTranslation)
        {
            wordTranslation = null;
            string[] words = source.Split(WORDS_SPLIT).RemoveEmpty();
            ;
            if (words.Length != 2) return false;
            wordTranslation = new WordTranslation(words[0], words[1]);
            return true;
        }
    }
}