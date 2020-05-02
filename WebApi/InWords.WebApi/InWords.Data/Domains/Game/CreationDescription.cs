using InWords.Data.Domains;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InWords.Data.Creations
{
    public class CreationDescription
    {
        public int CreationDescriptionId { get; set; }

        [Required] [StringLength(32)] public string Title { get; set; }


        [Required] [StringLength(255)] public string Description { get; set; }

        public int CreationId { get; set; }

        [ForeignKey(nameof(CreationId))] public virtual Game Game { get; set; }

        /// <summary>
        ///     Description on this lang
        /// </summary>
        public int LanguageId { get; set; }

        [ForeignKey(nameof(LanguageId))] public virtual Language Language { get; set; }
    }
}