using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheDailyThree.Data_Access;
using TheDailyThree.Models;

namespace TheDailyThree.Controllers
{
    [Route("api/goals")]
    [ApiController]
    public class GoalController : ControllerBase
    {
        private readonly IGoalRepository _goalRepo;
        public GoalController(IGoalRepository goalRepo)
        {
            _goalRepo = goalRepo;
        }

        [HttpGet("{userId}")]
        public List<Goal> GetAllGoals(int userId)
        {
            return _goalRepo.GetAllUserGoals(userId);
        }

        [HttpGet("user/uid/{uid}")]
        public List<Goal> GetAllGoalsByUid(string uid)
        {
            return _goalRepo.GetUserGoalsByUid(uid);
        }

        [HttpGet("id/{id}")]
        public IActionResult GetSingleGoal(int id)
        {
            var match = _goalRepo.GetGoalById(id);
            if (match == null)
            {
                return NotFound();
            }
            return Ok(match);
        }

        [HttpPost]
        public IActionResult CreateGoal(Goal newGoal)
        {
            if (newGoal == null)
            {
                return NotFound();
            }
            else
            {
                _goalRepo.AddGoal(newGoal);
                return Ok(newGoal);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var match = _goalRepo.GetGoalById(id);
            if (match == null)
            {
                return NotFound();
            }
            else
            {
                _goalRepo.DeleteGoal(id);
                return NoContent();
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(Goal goalToUpdate)
        {
            var match = _goalRepo.GetGoalById(goalToUpdate.Id);
            if (match == null)
            {
                return NotFound();
            }
            _goalRepo.UpdateGoal(goalToUpdate);
            return NoContent();
        }
    }
}
