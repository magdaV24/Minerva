

namespace API.DTOs
{
    public class EditFlipCardDTO
    {
        public int Id { get; set; }
        public string Category { get; set; }
        public string Front{ get; set; }
        public string Back { get; set; }
        public int Public { get; set; }
    }
}