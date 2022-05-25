using TheDailyThree.Models;

namespace TheDailyThree.Data_Access
{
    public interface IEntryRepository
    {
        List<Entry> GetAllUserEntries(int userId);
        List<Entry> GetUserEntriesByUid(string uid);
        Entry GetEntryById(int id);
        void AddEntry(Entry newEntry);
        void DeleteEntry(int id);
    }
}
