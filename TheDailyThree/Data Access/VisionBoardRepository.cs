using System.Data.SqlClient;
using TheDailyThree.Models;

namespace TheDailyThree.Data_Access
{
    public class VisionBoardRepository : IVisionBoardRepository
    {
        private readonly IConfiguration _config;

        public VisionBoardRepository(IConfiguration config)
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

        private List<VisionBoard> ReadVisionBoards(SqlDataReader _reader)
        {
            var visionBoards = new List<VisionBoard>();
            while (_reader.Read())
            {
                VisionBoard visionBoard = new VisionBoard()
                {
                    Id = _reader.GetInt32(_reader.GetOrdinal("Id")),
                    Title = _reader.GetString(_reader.GetOrdinal("Title")),
                    UserId = _reader.GetInt32(_reader.GetOrdinal("UserId")),
                };
                visionBoards.Add(visionBoard);
            }
            _reader.Close();
            return visionBoards;
        }

        public void AddVisionBoard(VisionBoard _newVisionBoard)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO [dbo].[VisionBoards] (Title, UserId)
                        VALUES (@Title, @UserId)
                    ";
                    cmd.Parameters.AddWithValue("@Title", _newVisionBoard.Title);
                    cmd.Parameters.AddWithValue("@UserId", _newVisionBoard.UserId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteVisionBoard(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM VisionBoards
                        WHERE Id = @id
                    ";
                    cmd.Parameters.AddWithValue("@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<VisionBoard> GetAllUserVisionBoards(int _userId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT * FROM VisionBoards
                        WHERE UserId = @id
                    ";

                    cmd.Parameters.AddWithValue("@id", _userId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var visionBoards = ReadVisionBoards(reader);
                        return visionBoards;
                    }
                }
            }
        }

        public List<VisionBoard> GetUserVisionBoardsByUid(string _uid)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT * FROM [VisionBoards] VB
                        LEFT JOIN [User] Us ON Us.Id = VB.UserId
                        WHERE Us.[Uid] = @uid;
                    ";

                    cmd.Parameters.AddWithValue("@uid", _uid);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var visionBoards = ReadVisionBoards(reader);
                        return visionBoards;
                    }
                }
            }
        }

        public VisionBoard GetVisionBoardById(int _id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT * FROM VisionBoards
                        WHERE Id = @id
                    ";

                    cmd.Parameters.AddWithValue("@id", _id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var visionBoard = ReadVisionBoards(reader).FirstOrDefault();
                        return visionBoard;
                    }
                }
            }
        }

        public void UpdateVisionBoard(VisionBoard _visionBoard)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE [dbo].[VisionBoards]
                        SET Title = @Title, UserId = @UserId
                        WHERE Id = @Id
                    ";

                    cmd.Parameters.AddWithValue("@Id", _visionBoard.Id);
                    cmd.Parameters.AddWithValue("@Title", _visionBoard.Title);
                    cmd.Parameters.AddWithValue("@UserId", _visionBoard.UserId);

                    cmd.ExecuteNonQuery();
                }
            }

        }
    }
}
