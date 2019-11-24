using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Threading.Tasks;
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
        public async Task<IActionResult> Post(IFormFile file)
        {
            long size = file.Length;
            if (file.Length <= 0) return NoContent();

            // process image
            using (var image = new Bitmap(System.Drawing.Image.FromStream(file.OpenReadStream())))
            {
                //set 256x256
                int imageSize = 256;
                int width, height;
                if (image.Width < image.Height)
                {
                    width = imageSize;
                    height = Convert.ToInt32(image.Height * imageSize / (double)image.Width);
                }
                else
                {
                    width = Convert.ToInt32(image.Width * imageSize / (double)image.Height);
                    height = imageSize;
                }
                var resized = new Bitmap(image, width, height);

                // crop
                var cropArea = new Rectangle(0, 0, imageSize, imageSize);
                Bitmap cropImage = resized.Clone(cropArea, resized.PixelFormat);

                //encode webP TODO
                string filePath = Path.Combine(Directory.GetCurrentDirectory(), "Temp");
                Directory.CreateDirectory(filePath);
                string fileName = $"{Guid.NewGuid()}.jpeg";
                filePath = Path.Combine(filePath, fileName);
                cropImage.Save(filePath, ImageFormat.Jpeg);

            }
            return Ok(new { size });
        }
    }
}