using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace InWords.WebApi.Services.UsersAvatars.Models
{
    public class ImageFilter : IDisposable
    {
        private readonly Bitmap bitmap;
        public ImageFilter(Bitmap bitmap)
        {
            this.bitmap = bitmap;
        }

        public ImageFilter(IFormFile file) : this(new Bitmap(Image.FromStream(file.OpenReadStream()))) { }

        public ImageFilter Crop(int x, int y, int width, int height)
        {

            return this;
        }

        public void Dispose()
        {
            bitmap.Dispose();
        }
    }
}
