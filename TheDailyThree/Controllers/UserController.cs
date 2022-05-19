using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheDailyThree.Data_Access;
using TheDailyThree.Models;

namespace TheDailyThree.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepo;
        public UserController(IUserRepository userRepo)
        {
            _userRepo = userRepo;
        }

        [HttpGet("id/{id}")]
        public IActionResult GetSingleUser(int id)
        {
            var match = _userRepo.GetUserById(id);
            if (match == null)
            {
                return NotFound();
            }
            return Ok(match);
        }

        [HttpPost]
        public IActionResult CreateUser(User newUser)
        {
            if (newUser == null)
            {
                return NotFound();
            }
            else
            {
                _userRepo.AddUser(newUser);
                return Ok(newUser);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(User userToUpdate)
        {
            var match = _userRepo.GetUserById(userToUpdate.Id);
            if (match == null)
            {
                return NotFound();
            }
            _userRepo.UpdateUser(userToUpdate);
            return NoContent();
        }
    }
}
