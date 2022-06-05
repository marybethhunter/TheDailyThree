using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheDailyThree.Data_Access;
using TheDailyThree.Models;

namespace TheDailyThree.Controllers
{
    [Route("api/visionboardimages")]
    [ApiController]
    public class VisionBoardImageController : ControllerBase
    {
        private readonly IVisionBoardImageRepository _visionBoardImageRepo;
        public VisionBoardImageController(IVisionBoardImageRepository visionBoardImageRepo)
        {
            _visionBoardImageRepo = visionBoardImageRepo;
        }

        [HttpGet("{vbId}")]
        public List<VisionBoardImage> GetAllVisionBoardImagesByVisionBoardId(int vbId)
        {
            return _visionBoardImageRepo.GetAllVisionBoardImagesByVBId(vbId);
        }

        [HttpGet("id/{id}")]
        public IActionResult GetSingleVisionBoardImage(int id)
        {
            var match = _visionBoardImageRepo.GetVisionBoardImageById(id);
            if (match == null)
            {
                return NotFound();
            }
            return Ok(match);
        }

        [HttpPost]
        public IActionResult CreateVisionBoardImage(VisionBoardImage newVisionBoardImage)
        {
            if (newVisionBoardImage == null)
            {
                return NotFound();
            }
            else
            {
                _visionBoardImageRepo.AddVisionBoardImage(newVisionBoardImage);
                return Ok(newVisionBoardImage);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var match = _visionBoardImageRepo.GetVisionBoardImageById(id);
            if (match == null)
            {
                return NotFound();
            }
            else
            {
                _visionBoardImageRepo.DeleteVisionBoardImage(id);
                return NoContent();
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(VisionBoardImage visionBoardImageToUpdate)
        {
            var match = _visionBoardImageRepo.GetVisionBoardImageById(visionBoardImageToUpdate.Id);
            if (match == null)
            {
                return NotFound();
            }
            _visionBoardImageRepo.UpdateVisionBoardImage(visionBoardImageToUpdate);
            return NoContent();
        }
    }
}
