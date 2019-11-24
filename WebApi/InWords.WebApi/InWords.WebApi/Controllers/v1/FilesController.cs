using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Threading.Tasks;
using ImageProcessor;
using ImageProcessor.Plugins.WebP.Imaging.Formats;
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
        private async Task<IActionResult> Post(IFormFile file)
        {
            if (file.Length <= 0) return NoContent();

            
            // Then save in WebP format
            string webPImagePath = $"{CreatePath()}.WebP";
            
            return Ok(new { webPImagePath });
        }

        

        private static string CreatePath()
        {
            string filePath = Path.Combine(Directory.GetCurrentDirectory(), "Temp");
            Directory.CreateDirectory(filePath);
            string fileName = $"{Guid.NewGuid()}";
            return Path.Combine(filePath, fileName);
        }


        private static void SaveToWebP(Image cropImage, string webPImagePath)
        {
            using var webPFileStream = new FileStream(webPImagePath, FileMode.Create);
            using var imageFactory = new ImageFactory(preserveExifData: false);
            imageFactory.Load(cropImage)
                .Format(new WebPFormat())
                .Quality(80)
                .Save(webPFileStream);
        }
    }
}