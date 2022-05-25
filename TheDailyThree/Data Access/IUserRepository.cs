using TheDailyThree.Models;

namespace TheDailyThree.Data_Access
{
    public interface IUserRepository
    {
        public void AddUser(User newUser);
        User GetUserById(int id);
        public void UpdateUser(User userToUpdate);
        public bool CheckUserExists(string uid);
        User GetUserByUid(string uid);
    }
}
