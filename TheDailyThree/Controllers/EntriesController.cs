using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheDailyThree.Data_Access;
using TheDailyThree.Models;

namespace TheDailyThree.Controllers
{
    [Route("api/entries")]
    [ApiController]
    public class EntriesController : ControllerBase
    {
        private readonly IEntryRepository _entryRepo;
        public EntriesController(IEntryRepository entryRepo)
        {
            _entryRepo = entryRepo;
        }
        [HttpGet("user/{userId}")]
        public List<Entry> GetAllEntries(int userId)
        {
            return _entryRepo.GetAllUserEntries(userId);
        }

        [HttpGet("id/{id}")]
        public IActionResult GetSingleEntry(int id)
        {
            var match = _entryRepo.GetEntryById(id);
            if (match == null)
            {
                return NotFound();
            }
            return Ok(match);
        }

        [HttpPost]
        public IActionResult CreateEntry(Entry newEntry)
        {
            if (newEntry == null)
            {
                return NotFound();
            }
            else
            {
                _entryRepo.AddEntry(newEntry);
                return Ok(newEntry);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var match = _entryRepo.GetEntryById(id);
            if (match == null)
            {
                return NotFound();
            }
            else
            {
                _entryRepo.DeleteEntry(id);
                return NoContent();
            }
        }
    }
}
