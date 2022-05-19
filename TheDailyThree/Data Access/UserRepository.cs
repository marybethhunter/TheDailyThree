using System.Data.SqlClient;
using TheDailyThree.Models;

namespace TheDailyThree.Data_Access
{
    public class UserRepository : IUserRepository
    {
        private readonly IConfiguration _config;

        public UserRepository(IConfiguration config)
        {
            _config = config;
        }

        public SqlConnection Connection
        {
            get
            {
                return new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            }
        }

        private List<User> ReadUsers(SqlDataReader _reader)
        {
            var users = new List<User>();
            while (_reader.Read())
            {
                User user = new User()
                {
                    Id = _reader.GetInt32(_reader.GetOrdinal("Id")),
                    Name = _reader.GetString(_reader.GetOrdinal("Name")),
                    Uid = _reader.GetString(_reader.GetOrdinal("Uid")),
                    Streak = _reader.GetInt32(_reader.GetOrdinal("Streak"))
                };
                users.Add(user);
            }
            _reader.Close();
            return users;
        }

        public void AddUser(User _newUser)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO [dbo].[User] ([Name], [Uid], Streak)
                        VALUES (@Name, @Uid, @Streak)
                    ";
                    cmd.Parameters.AddWithValue("@Name", _newUser.Name);
                    cmd.Parameters.AddWithValue("@Uid", _newUser.Uid);
                    cmd.Parameters.AddWithValue("@Streak", _newUser.Streak);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public User GetUserById(int _id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT * FROM [User]
                        WHERE Id = @id
                    ";

                    cmd.Parameters.AddWithValue("@id", _id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var user = ReadUsers(reader).FirstOrDefault();
                        return user;
                    }
                }
            }
        }

        public void UpdateUser(User _user)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE [dbo].[User]
                        SET Name = @Name, Uid = @Uid, Streak = @Streak
                        WHERE Id = @Id
                    ";

                    cmd.Parameters.AddWithValue("@Id", _user.Id);
                    cmd.Parameters.AddWithValue("@Name", _user.Name);
                    cmd.Parameters.AddWithValue("@Uid", _user.Uid);
                    cmd.Parameters.AddWithValue("@Streak", _user.Streak);

                    cmd.ExecuteNonQuery();
                }
            }

        }
    }
}
