﻿using System;
using System.Collections.Generic;
using System.Text;

namespace InWords.Transfer.Data
{
    public class PullWordsAnswer
    {
        /// <summary>
        /// List of old (deleted) words
        /// </summary>
        public List<int> RemovedServerIds;

        /// <summary>
        /// List of new (added) words
        /// </summary>
        public List<WordTranslation> AddedWords;
    }
}
