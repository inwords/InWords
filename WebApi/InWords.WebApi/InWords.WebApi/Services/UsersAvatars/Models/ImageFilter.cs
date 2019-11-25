using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using ImageProcessor;
using ImageProcessor.Plugins.WebP.Imaging.Formats;
using InWords.WebApi.Extensions.BitmapExtensions;
using Microsoft.AspNetCore.Http;

namespace InWords.WebApi.Services.UsersAvatars.Models
{
    public sealed class ImageFilter : IDisposable
    {
        private Bitmap bitmap;
        private List<Bitmap> Disposable { get; set; }
        private List<string> TempFiles { get; set; }
        public ImageFilter(Bitmap bitmap)
        {
            this.bitmap = bitmap;
            Disposable = new List<Bitmap>();
            TempFiles = new List<string>();
        }

        public ImageFilter(IFormFile file) : this(new Bitmap(Image.FromStream(file.OpenReadStream()))) { }

        public ImageFilter Resize(int size)
        {
            Disposable.Add(bitmap);
            bitmap = bitmap.ResizeToSize(256);
            return this;
        }
        public string CreateTempWebP()
        {
            string tempFile = SaveToWebP(bitmap);
            TempFiles.Add(tempFile);
            return tempFile;
        }

        public ImageFilter Crop(int size)
        {
            return Crop(0, 0, size, size);
        }
        public ImageFilter Crop(int width, int height)
        {
            return Crop(0, 0, width, height);
        }

        public ImageFilter Crop(int x, int y, int width, int height)
        {
            Disposable.Add(bitmap);
            var cropRectangle = new Rectangle(x, y, width, height);
            bitmap = bitmap.CropAtRect(cropRectangle);
            return this;
        }

        public void Dispose()
        {
            bitmap.Dispose();
            Disposable.ForEach(d => d.Dispose());
            foreach (string file in TempFiles)
            {
                File.Delete(file);
            }
        }

        //TODO file saver
        private static string SaveToWebP(Image cropImage)
        {
            string webPImagePath = $"{CreatePath()}.WebP";
            using var webPFileStream = new FileStream(webPImagePath, FileMode.Create);
            using var imageFactory = new ImageFactory(preserveExifData: false);
            imageFactory.Load(cropImage)
                .Format(new WebPFormat())
                .Quality(80)
                .Save(webPFileStream);
            return webPImagePath;
        }
        private static string CreatePath()
        {
            string filePath = Path.Combine(Directory.GetCurrentDirectory(), "Temp");
            Directory.CreateDirectory(filePath);
            string fileName = $"{Guid.NewGuid()}";
            return Path.Combine(filePath, fileName);
        }

    }
}
