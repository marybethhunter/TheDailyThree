using System.Data.SqlClient;
using TheDailyThree.Models;

namespace TheDailyThree.Data_Access
{
    public class VisionBoardImageRepository : IVisionBoardImageRepository
    {
        private readonly IConfiguration _config;

        public VisionBoardImageRepository(IConfiguration config)
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

        private List<VisionBoardImage> ReadVisionBoardImages(SqlDataReader _reader)
        {
            var visionBoardImages = new List<VisionBoardImage>();
            while (_reader.Read())
            {
                VisionBoardImage visionBoardImage = new VisionBoardImage()
                {
                    Id = _reader.GetInt32(_reader.GetOrdinal("Id")),
                    Src = _reader.GetString(_reader.GetOrdinal("Src")),
                    AltText = _reader.GetString(_reader.GetOrdinal("AltText")),
                    VisionBoardId = _reader.GetInt32(_reader.GetOrdinal("VisionBoardId")),
                };
                visionBoardImages.Add(visionBoardImage);
            }
            _reader.Close();
            return visionBoardImages;
        }

        public void AddVisionBoardImage(VisionBoardImage _newVisionBoardImage)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO [dbo].[VisionBoardImages] (Src, AltText, VisionBoardId)
                        VALUES (@Src, @AltText, @VisionBoardId)
                    ";
                    cmd.Parameters.AddWithValue("@Src", _newVisionBoardImage.Src);
                    cmd.Parameters.AddWithValue("@AltText", _newVisionBoardImage.AltText);
                    cmd.Parameters.AddWithValue("@VisionBoardId", _newVisionBoardImage.VisionBoardId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteVisionBoardImage(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM VisionBoardImages
                        WHERE Id = @id
                    ";
                    cmd.Parameters.AddWithValue("@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<VisionBoardImage> GetAllVisionBoardImagesByVBId(int _visionBoardId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT * FROM VisionBoardImages
                        WHERE VisionBoardId = @id
                    ";

                    cmd.Parameters.AddWithValue("@id", _visionBoardId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var visionBoardImages = ReadVisionBoardImages(reader);
                        return visionBoardImages;
                    }
                }
            }
        }

        public VisionBoardImage GetVisionBoardImageById(int _id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT * FROM VisionBoardImages
                        WHERE Id = @id
                    ";

                    cmd.Parameters.AddWithValue("@id", _id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var visionBoardImage = ReadVisionBoardImages(reader).FirstOrDefault();
                        return visionBoardImage;
                    }
                }
            }
        }

        public void UpdateVisionBoardImage(VisionBoardImage _visionBoardImage)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE [dbo].[VisionBoardImages]
                        SET Src = @Src, AltText = @AltText, VisionBoardId = @VisionBoardId
                        WHERE Id = @Id
                    ";

                    cmd.Parameters.AddWithValue("@Id", _visionBoardImage.Id);
                    cmd.Parameters.AddWithValue("@Src", _visionBoardImage.Src);
                    cmd.Parameters.AddWithValue("@AltText", _visionBoardImage.AltText);
                    cmd.Parameters.AddWithValue("@VisionBoardId", _visionBoardImage.VisionBoardId);

                    cmd.ExecuteNonQuery();
                }
            }

        }
    }
}
