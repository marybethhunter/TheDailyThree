using TheDailyThree.Models;

namespace TheDailyThree.Data_Access
{
    public interface IGoalRepository
    {
        List<Goal> GetAllUserGoals(int userId);
        List<Goal> GetUserGoalsByUid(string uid);
        Goal GetGoalById(int id);
        void AddGoal(Goal newGoal);
        void DeleteGoal(int id);
        public void UpdateGoal(Goal goalToUpdate);
    }
}
