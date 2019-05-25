using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InWords.WebApi.Controllers.v1
{
    //[Authorize]
    [ApiController]
    [Produces("application/json")]
    [ApiVersion("1.0")]
    [Route("v{version:apiVersion}/[controller]")]
    public class FilesController : ControllerBase
    {
        /// <summary>
        ///     Upload file to static storage
        /// </summary>
        /// <returns>list of users like nickname</returns>
        /// <response code="200">OK</response>
        /// <response code="401">Unauthorized</response>
        [ProducesResponseType(typeof(IEnumerable<IFormFile>), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [HttpPost("UploadFiles")]
        public async Task<IActionResult> Post(List<IFormFile> files)
        {
            long size = files.Sum(f => f.Length);

            // full path to file in temp location
            string filePath = Path.GetTempFileName();

            foreach (IFormFile formFile in files)
            {
                if (formFile.Length <= 0) continue;
                
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await formFile.CopyToAsync(stream);
                }
            }

            // process uploaded files
            // Don't rely on or trust the FileName property without validation.
            return Ok(new { count = files.Count, size, filePath});
        }
    }
}