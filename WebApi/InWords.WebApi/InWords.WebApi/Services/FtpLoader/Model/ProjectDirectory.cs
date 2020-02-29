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
