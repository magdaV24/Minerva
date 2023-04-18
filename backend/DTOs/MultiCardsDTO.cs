using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class MultiCardsDTO
    {
        [Required]
        public string Category { get; set; }
        [Required]
        public string Question { get; set; }
        [Required]
        public string OptionOne { get; set; }
        [Required]
        public string OptionTwo { get; set; }

        [Required]
        public string OptionThree { get; set; }
        [Required]
        public string RightAns { get; set; }
        [Required]
        public int UserID { get; set; }
        [Required]
        [Range(0,1)]
        public int Public { get; set; }
    }
}