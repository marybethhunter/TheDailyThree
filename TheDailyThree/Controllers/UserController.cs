using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Authorization;
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

        [HttpGet("{uid}")]
        public ActionResult UserByUid(string uid)
        {
            User user = _userRepo.GetUserByUid(uid);
            if (user == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(user);
            }
        }

        [Authorize]
        [HttpGet("Auth")]
        public async Task<IActionResult> GetUserAuthStatus()
        {
            string uid = User.FindFirst(claim => claim.Type == "user_id").Value;
            bool userexists = _userRepo.CheckUserExists(uid);
            if (!userexists)
            {
                User userFromToken = new User()
                {
                    Name = User.Identity.Name,
                    Uid = uid,
                    Streak = 0,
                };

                _userRepo.AddUser(userFromToken);
                return Ok();
            }
            User existingUser = _userRepo.GetUserByUid(uid);
            return Ok(existingUser);
        }
    }
}
