using MediatR;
using Microsoft.AspNetCore.Http;

namespace InWords.WebApi.Services.UsersAvatars.FileUploadAvatar
{
    public class UploadAvatarQuery : IRequest<UploadAvatarQueryResult>
    {
        public int UserId { get; set; }
        public IFormFile AvatarFile { get; set; }
        public UploadAvatarQuery(int userId, IFormFile file)
        {
            this.UserId = userId;
            this.AvatarFile = file;
        }
    }
}
