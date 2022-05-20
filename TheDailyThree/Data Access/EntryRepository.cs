using System.Data.SqlClient;
using TheDailyThree.Models;

namespace TheDailyThree.Data_Access
{
    public class EntryRepository : IEntryRepository
    {
        private readonly IConfiguration _config;

        public EntryRepository(IConfiguration config)
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

        private List<Entry> ReadEntries(SqlDataReader _reader)
        {
            var entries = new List<Entry>();
            while (_reader.Read())
            {
                Entry entry = new Entry()
                {
                    Id = _reader.GetInt32(_reader.GetOrdinal("Id")),
                    Date = _reader.GetString(_reader.GetOrdinal("Date")),
                    Thing1 = _reader.GetString(_reader.GetOrdinal("Thing1")),
                    Thing2 = _reader.GetString(_reader.GetOrdinal("Thing2")),
                    Thing3 = _reader.GetString(_reader.GetOrdinal("Thing3")),
                    Comment = _reader.GetString(_reader.GetOrdinal("Comment")),
                    MoodId = _reader.GetInt32(_reader.GetOrdinal("MoodId")),
                    UserId = _reader.GetInt32(_reader.GetOrdinal("UserId")),
                };
                entries.Add(entry);
            }
            _reader.Close();
            return entries;
        }

        public void AddEntry(Entry _newEntry)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO [dbo].[Entry] ([Date], Thing1, Thing2, Thing3, Comment, MoodId, UserId)
                        VALUES (@Date, @Thing1, @Thing2, @Thing3, @Comment, @MoodId, @UserId)
                    ";
                    cmd.Parameters.AddWithValue("@Date", _newEntry.Date);
                    cmd.Parameters.AddWithValue("@Thing1", _newEntry.Thing1);
                    cmd.Parameters.AddWithValue("@Thing2", _newEntry.Thing2);
                    cmd.Parameters.AddWithValue("@Thing3", _newEntry.Thing3);
                    cmd.Parameters.AddWithValue("@Comment", _newEntry.Comment);
                    cmd.Parameters.AddWithValue("@MoodId", _newEntry.MoodId);
                    cmd.Parameters.AddWithValue("@UserId", _newEntry.UserId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteEntry(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM Entry
                        WHERE Id = @id
                    ";
                    cmd.Parameters.AddWithValue("@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<Entry> GetAllUserEntries(int _userId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT * FROM Entry
                        WHERE UserId = @id
                    ";

                    cmd.Parameters.AddWithValue("@id", _userId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var entries = ReadEntries(reader);
                        return entries;
                    }
                }
            }
        }

        public Entry GetEntryById(int _id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT * FROM Entry
                        WHERE Id = @id
                    ";

                    cmd.Parameters.AddWithValue("@id", _id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var entry = ReadEntries(reader).FirstOrDefault();
                        return entry;
                    }
                }
            }
        }
    }
}
