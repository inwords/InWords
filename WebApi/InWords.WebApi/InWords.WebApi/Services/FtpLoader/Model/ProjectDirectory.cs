using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.FtpLoader.Model
{
    public static class ProjectDirectory
    {
        public static string Resolve(ProjectDirectories projectDirectories)
        {
            return projectDirectories switch
            {
                ProjectDirectories.Avatars => "Avatars",
                _ => "Temp"
            };
        }
    }
}
