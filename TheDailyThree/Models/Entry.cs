namespace TheDailyThree.Models
{
    public class Entry
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Thing1 { get; set; }
        public string Thing2 { get; set; }
        public string Thing3 { get; set; }
        public string Comment {  get; set; }
        public int MoodId { get; set; }
        public int UserId { get; set; }
    }
}
