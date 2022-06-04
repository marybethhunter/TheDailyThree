using TheDailyThree.Models;

namespace TheDailyThree.Data_Access
{
    public interface IVisionBoardRepository
    {
        List<VisionBoard> GetAllUserVisionBoards(int userId);
        List<VisionBoard> GetUserVisionBoardsByUid(string uid);
        VisionBoard GetVisionBoardById(int id);
        void AddVisionBoard(VisionBoard newGoal);
        void DeleteVisionBoard(int id);
        public void UpdateVisionBoard(VisionBoard visionBoardToUpdate);
    }
}
