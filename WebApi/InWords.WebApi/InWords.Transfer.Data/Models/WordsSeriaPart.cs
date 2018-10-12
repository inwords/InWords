using System;
using System.Collections.Generic;
using System.Text;

namespace InWords.Transfer.Data.Models
{
    public class WordsSeriaPart : WordTranslation
    {
        ///public int Id
        ///public string WordForeign
        ///public string WordNative
        ///public int ServerId

        public int SeriaID { get; set; }

        public WordsSeriaPart(WordTranslation wordTranslation) : base(wordTranslation)
        {

        }
    }
}
