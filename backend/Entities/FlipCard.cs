namespace API.Entities
{
    public class FlipCard
    {
        public int Id { get; set; }
        public string Front { get; set; }
        public string Back { get; set; }

        public string Category { get; set; }
        
        public int UserID { get; set; }

        public int Public { get; set; }
    }
}