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

            // process image
            using var image = new Bitmap(Image.FromStream(file.OpenReadStream()));

            //set 256x256
            const int imageSize = 256;
            using Bitmap resized = ResizeBitmap(image, 256);

            // crop
            var cropArea = new Rectangle(0, 0, imageSize, imageSize);
            using Bitmap cropImage = resized.Clone(cropArea, resized.PixelFormat);

            // Then save in WebP format
            string webPImagePath = $"{CreatePath()}.WebP";
            SaveToWebP(cropImage, webPImagePath);

            return Ok(new { webPImagePath });
        }

        private static Bitmap ResizeBitmap(Image bitmap, int minSize)
        {
            int width, height;
            if (bitmap.Width < bitmap.Height)
            {
                width = minSize;
                height = Convert.ToInt32(bitmap.Height * minSize / (double)bitmap.Width);
            }
            else
            {
                width = Convert.ToInt32(bitmap.Width * minSize / (double)bitmap.Height);
                height = minSize;
            }
            return new Bitmap(bitmap, width, height);
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