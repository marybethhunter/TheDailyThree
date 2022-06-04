using TheDailyThree.Models;

namespace TheDailyThree.Data_Access
{
    public interface IVisionBoardImageRepository
    {
        List<VisionBoardImage> GetAllVisionBoardImagesByVBId(int vbId);
        VisionBoardImage GetVisionBoardImageById(int id);
        void AddVisionBoardImage(VisionBoardImage newVisionBoardImage);
        void DeleteVisionBoardImage(int id);
        public void UpdateVisionBoardImage(VisionBoardImage visionBoardImageToUpdate);
    }
}
