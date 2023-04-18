using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class FlipCardDTO
    {
        [Required]
        public string Category { get; set; }
        [Required]
        public string Front{ get; set; }
        [Required]
        public string Back { get; set; }
        [Required]
        public int UserID { get; set; }
        [Required]
        [Range(0,1)]
        public int Public{ get; set; }
    }
}