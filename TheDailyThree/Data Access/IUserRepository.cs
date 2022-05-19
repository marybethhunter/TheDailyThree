using TheDailyThree.Models;

namespace TheDailyThree.Data_Access
{
    public interface IUserRepository
    {
        void AddUser(User newUser);
        User GetUserById(int id);
        void UpdateUser(User userToUpdate);
    }
}
