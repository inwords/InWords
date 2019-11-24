using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using InWords.Data;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApi.Services.FtpLoader.Model;
using MediatR;

namespace InWords.WebApi.Services.UsersAvatars.UploadAvatar
{
    public class UploadAvatar : ContextRequestHandler<UploadAvatarQuery, UploadAvatarQueryResult, InWordsDataContext>
    {
        const int IMAGE_SIZE = 256;

        private readonly FileLoader fileLoader;

        public UploadAvatar(InWordsDataContext context, FileLoader fileLoader) : base(context)
        {
            this.fileLoader = fileLoader;
        }

        public override Task<UploadAvatarQueryResult> Handle(UploadAvatarQuery request, CancellationToken cancellationToken = default)
        {
            using var imageFromRequest = new Bitmap(Image.FromStream(request.AvatarFile.OpenReadStream()));
            using Bitmap resizedTo256 = ResizeBitmap(imageFromRequest, 256);

            var cropRectangle = new Rectangle(0, 0, IMAGE_SIZE, IMAGE_SIZE);
            using Bitmap croppedAvatar = resizedTo256.Clone(cropRectangle, resizedTo256.PixelFormat);

            // save to ftp
            var ftpClient = fileLoader.GetConnectedClient();
            ftpClient.Upload(new MemoryStream(croppedAvatar), )
            // update account linkId

            return base.Handle(request, cancellationToken);
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
    }
}
