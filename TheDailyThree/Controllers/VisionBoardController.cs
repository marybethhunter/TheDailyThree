using Microsoft.AspNetCore.Mvc;
using TheDailyThree.Data_Access;
using TheDailyThree.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TheDailyThree.Controllers
{
    [Route("api/visionboards")]
    [ApiController]
    public class VisionBoardController : ControllerBase
    {
        private readonly IVisionBoardRepository _visionBoardRepo;
        public VisionBoardController(IVisionBoardRepository visionBoardRepo)
        {
            _visionBoardRepo = visionBoardRepo;
        }

        [HttpGet("{userId}")]
        public List<VisionBoard> GetAllVisionBoards(int userId)
        {
            return _visionBoardRepo.GetAllUserVisionBoards(userId);
        }

        [HttpGet("user/uid/{uid}")]
        public List<VisionBoard> GetAllVisionBoardsByUid(string uid)
        {
            return _visionBoardRepo.GetUserVisionBoardsByUid(uid);
        }

        [HttpGet("id/{id}")]
        public IActionResult GetSingleVisionBoard(int id)
        {
            var match = _visionBoardRepo.GetVisionBoardById(id);
            if (match == null)
            {
                return NotFound();
            }
            return Ok(match);
        }

        [HttpPost]
        public IActionResult CreateVisionBoard(VisionBoard newVisionBoard)
        {
            if (newVisionBoard == null)
            {
                return NotFound();
            }
            else
            {
                _visionBoardRepo.AddVisionBoard(newVisionBoard);
                return Ok(newVisionBoard);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var match = _visionBoardRepo.GetVisionBoardById(id);
            if (match == null)
            {
                return NotFound();
            }
            else
            {
                _visionBoardRepo.DeleteVisionBoard(id);
                return NoContent();
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(VisionBoard visionBoardToUpdate)
        {
            var match = _visionBoardRepo.GetVisionBoardById(visionBoardToUpdate.Id);
            if (match == null)
            {
                return NotFound();
            }
            _visionBoardRepo.UpdateVisionBoard(visionBoardToUpdate);
            return NoContent();
        }
    }
}
