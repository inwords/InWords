using System.IO;
using System.Threading;
using System.Threading.Tasks;
using InWords.Data;
using InWords.Data.Domains;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApi.Services.FtpLoader.Model;
using InWords.WebApi.Services.UsersAvatars.Models;

namespace InWords.WebApi.Services.UsersAvatars.FileUploadAvatar
{
    public class UploadAvatar : ContextRequestHandler<UploadAvatarQuery, UploadAvatarQueryResult, InWordsDataContext>
    {
        const int IMAGE_SIZE = 256;
        private const string FILE_FORMAT = ".WebP";
        private readonly FileLoader fileLoader;

        public UploadAvatar(InWordsDataContext context, FileLoader fileLoader) : base(context)
        {
            this.fileLoader = fileLoader;
        }

        public override async Task<UploadAvatarQueryResult> Handle(UploadAvatarQuery request, CancellationToken cancellationToken = default)
        {
            string avatarUrl;

            // proceed avatar 
            using (var imageFilter = new ImageFilter(request.AvatarFile))
            {
                ImageFilter image = imageFilter
                    .Resize(IMAGE_SIZE)
                    .Crop(IMAGE_SIZE);

                string disposableWebP = image.CreateTempWebP();

                avatarUrl = await fileLoader
                    .UploadAsync(disposableWebP, ProjectDirectories.Avatars)
                    .ConfigureAwait(false);
            }
            
            User user = Context.Users.Find(request.UserId);

            // delete old file
            string oldAvatar = user.AvatarPath;
            user.AvatarPath = avatarUrl;
            await Context.SaveChangesAsync(cancellationToken)
                .ConfigureAwait(false);
            await fileLoader.DeleteAsync(oldAvatar)
                .ConfigureAwait(false);
            
            return new UploadAvatarQueryResult() { AvatarPath = avatarUrl };
        }

    }
}
