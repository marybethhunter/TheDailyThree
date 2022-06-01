using System.Data.SqlClient;
using TheDailyThree.Models;

namespace TheDailyThree.Data_Access
{
    public class GoalRepository : IGoalRepository
    {
        private readonly IConfiguration _config;

        public GoalRepository(IConfiguration config)
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

        private List<Goal> ReadGoals(SqlDataReader _reader)
        {
            var goals = new List<Goal>();
            while (_reader.Read())
            {
                Goal goal = new Goal()
                {
                    Id = _reader.GetInt32(_reader.GetOrdinal("Id")),
                    Title = _reader.GetString(_reader.GetOrdinal("Title")),
                    Description = _reader.GetString(_reader.GetOrdinal("Description")),
                    Completed = _reader.GetBoolean(_reader.GetOrdinal("Completed")),
                    UserId = _reader.GetInt32(_reader.GetOrdinal("UserId"))
                };
                goals.Add(goal);
            }
            _reader.Close();
            return goals;
        }

        public void AddGoal(Goal _newGoal)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO [dbo].[Goals] (Title, [Description], Completed, UserId)
                        VALUES (@Title, @Description, @Completed, @UserId)
                    ";
                    cmd.Parameters.AddWithValue("@Title", _newGoal.Title);
                    cmd.Parameters.AddWithValue("@Description", _newGoal.Description);
                    cmd.Parameters.AddWithValue("@Completed", _newGoal.Completed);
                    cmd.Parameters.AddWithValue("@UserId", _newGoal.UserId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteGoal(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM Goals
                        WHERE Id = @id
                    ";
                    cmd.Parameters.AddWithValue("@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<Goal> GetAllUserGoals(int _userId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT * FROM Goals
                        WHERE UserId = @id
                    ";

                    cmd.Parameters.AddWithValue("@id", _userId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var goals = ReadGoals(reader);
                        return goals;
                    }
                }
            }
        }

        public List<Goal> GetUserGoalsByUid(string _uid)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT * FROM Goals Go
                        LEFT JOIN [User] Us ON Us.Id = Go.UserId
                        WHERE Us.[Uid] = @uid;
                    ";

                    cmd.Parameters.AddWithValue("@uid", _uid);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var goals = ReadGoals(reader);
                        return goals;
                    }
                }
            }
        }

        public void UpdateGoal(Goal _goal)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE [dbo].[Goals]
                        SET TItle = @Title, Description = @Description, Completed = @Completed
                        WHERE Id = @Id
                    ";

                    cmd.Parameters.AddWithValue("@Id", _goal.Id);
                    cmd.Parameters.AddWithValue("@Title", _goal.Title);
                    cmd.Parameters.AddWithValue("@Description", _goal.Description);
                    cmd.Parameters.AddWithValue("@Completed", _goal.Completed);

                    cmd.ExecuteNonQuery();
                }
            }

        }

        public Goal GetGoalById(int _id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT * FROM Goals
                        WHERE Id = @id
                    ";

                    cmd.Parameters.AddWithValue("@id", _id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var goal = ReadGoals(reader).FirstOrDefault();
                        return goal;
                    }
                }
            }
        }
    }
}