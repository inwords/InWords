﻿using System;
using System.Drawing;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using ImageProcessor;
using ImageProcessor.Plugins.WebP.Imaging.Formats;
using InWords.Data;
using InWords.Data.Domains;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApi.Services.FtpLoader.Model;

namespace InWords.WebApi.Services.UsersAvatars.FileUploadAvatar
{
    public class UploadAvatar : ContextRequestHandler<UploadAvatarQuery, UploadAvatarQueryResult, InWordsDataContext>
    {
        const int IMAGE_SIZE = 256;

        private readonly FileLoader fileLoader;

        public UploadAvatar(InWordsDataContext context, FileLoader fileLoader) : base(context)
        {
            this.fileLoader = fileLoader;
        }

        public override async Task<UploadAvatarQueryResult> Handle(UploadAvatarQuery request, CancellationToken cancellationToken = default)
        {
            using var imageFromRequest = new Bitmap(Image.FromStream(request.AvatarFile.OpenReadStream()));
            using Bitmap resizedTo256 = ResizeBitmap(imageFromRequest, 256);

            var cropRectangle = new Rectangle(0, 0, IMAGE_SIZE, IMAGE_SIZE);
            using Bitmap croppedAvatar = resizedTo256.Clone(cropRectangle, resizedTo256.PixelFormat);

            // Then save in WebP format
            string temp = SaveToWebP(croppedAvatar);

            // save to ftp
            string fileFormat = ".WebP";
            string url = await fileLoader.UploadAsync(new FileStream(temp, FileMode.Open), ProjectDirectories.Avatars)
                .ConfigureAwait(false);

            File.Delete(temp);

            await UpdateUserAvatarAsync(request.UserId, cancellationToken, url).ConfigureAwait(false);

            return new UploadAvatarQueryResult() { AvatarPath = url };
        }

        private Task UpdateUserAvatarAsync(int userId, CancellationToken cancellationToken, string url)
        {
            User user = Context.Users.Find(userId);
            user.AvatarPath = url;
            return Context.SaveChangesAsync(cancellationToken);
        }

        private static Bitmap ResizeBitmap(Image bitmap, int minSize)
        {
            int width, height;
            if (bitmap.Width < bitmap.Height)
            {
                width = minSize;
                int heightRate = bitmap.Height * minSize;
                height = Convert.ToInt32(heightRate / (double)bitmap.Width);
            }
            else
            {
                int widthRate = bitmap.Width * minSize;
                width = Convert.ToInt32(widthRate / (double)bitmap.Height);
                height = minSize;
            }
            return new Bitmap(bitmap, width, height);
        }
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
