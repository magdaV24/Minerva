namespace API.Entities
{
    public class MultiCard
    {
        public int Id { get; set; }
        public string Question { get; set; }
        public string OptionOne { get; set; }
        public string OptionTwo { get; set; }
        public string OptionThree { get; set; }
        public string RightAns { get; set; }
        public string Category { get; set; }     
        public int UserID { get; set; }
        public int Public { get; set; }
    }
}