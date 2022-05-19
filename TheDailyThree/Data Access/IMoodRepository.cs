using TheDailyThree.Models;

namespace TheDailyThree.Data_Access
{
    public interface IMoodRepository
    {
        List<Mood> GetAllMoods();
        Mood GetMoodById(int id);
        List<Mood> GetAllMoodsOfAUser(int userId);
    }
}
