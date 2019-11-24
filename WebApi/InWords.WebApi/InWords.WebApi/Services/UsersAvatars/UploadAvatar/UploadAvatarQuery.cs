using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace InWords.WebApi.Services.UsersAvatars.UploadAvatar
{
    public class UploadAvatarQuery : IRequest<UploadAvatarQueryResult>
    {
        public int UserId { get; set; }
        public IFormFile AvatarFile { get; set; }
    }
}
