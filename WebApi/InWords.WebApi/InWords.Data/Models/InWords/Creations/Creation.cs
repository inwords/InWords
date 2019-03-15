using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using InWords.Data.Models.InWords.Domains;

namespace InWords.Data.Models.InWords.Creations
{
    /// <summary>
    /// Words Set with levels
    /// </summary>
    public class Creation
    {
        [Key]
        public int CreationId { get; set; }

        public int CreatorId { get; set; }

        [ForeignKey(nameof(CreatorId))]
        public virtual User Creator { get; set; }
    }
}