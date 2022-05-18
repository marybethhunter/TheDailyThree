using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheDailyThree.Data_Access;
using TheDailyThree.Models;

namespace TheDailyThree.Controllers
{
    [Route("api/moods")]
    [ApiController]
    public class MoodsController : ControllerBase
    {
        private readonly IMoodRepository _moodRepo;
        public MoodsController(IMoodRepository moodRepo)
        {
            _moodRepo = moodRepo;
        }

        [HttpGet]
        public List<Mood> GetAll()
        {
            return _moodRepo.GetAllMoods();
        }

        [HttpGet("id/{id}")]
        public IActionResult GetSingleMood(int id)
        {
            var match = _moodRepo.GetMoodById(id);
            if (match == null)
            {
                return NotFound();
            }
            return Ok(match);
        }

        [HttpGet("user/{userId}")]
        public List<Mood> GetAllMoods(int userId)
        {
            return _moodRepo.GetAllMoodsOfAUser(userId);
        }
    }
}
