using System.Data.SqlClient;
using TheDailyThree.Models;

namespace TheDailyThree.Data_Access
{
    public class MoodRepository : IMoodRepository
    {
        private readonly IConfiguration _config;

        public MoodRepository(IConfiguration config)
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

        private List<Mood> ReadMoods(SqlDataReader _reader)
        {
            var moods = new List<Mood>();
            while (_reader.Read())
            {
                Mood mood = new Mood()
                {
                    Id = _reader.GetInt32(_reader.GetOrdinal("Id")),
                    Name = _reader.GetString(_reader.GetOrdinal("Name")),
                };
                moods.Add(mood);
            }
            _reader.Close();
            return moods;
        }

        public List<Mood> GetAllMoods()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT * FROM Mood
                    ";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var moods = ReadMoods(reader);
                        return moods;
                    }
                }
            }
        }

        public List<Mood> GetAllMoodsOfAUser(string _uid)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Mo.Id, Mo.[Name]
                        FROM Mood Mo
                        LEFT JOIN [Entry] En ON En.MoodId = Mo.Id
                        LEFT JOIN [User] Us ON Us.Id = En.UserId
                        WHERE Us.[uid] = @uid;
                    ";

                    cmd.Parameters.AddWithValue("@uid", _uid);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var moods = ReadMoods(reader);
                        return moods;
                    }
                }
            }
        }

        public Mood GetMoodById(int _id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT * FROM Mood
                        WHERE Id = @id
                    ";

                    cmd.Parameters.AddWithValue("@id", _id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var mood = ReadMoods(reader).FirstOrDefault();
                        return mood;
                    }
                }
            }
        }
    }
}
