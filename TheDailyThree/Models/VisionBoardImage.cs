namespace TheDailyThree.Models
{
    public class VisionBoardImage
    {
        public int Id { get; set; }
        public string Src { get; set; }
        public string AltText { get; set; }
        public int VisionBoardId { get; set; }
    }
}
