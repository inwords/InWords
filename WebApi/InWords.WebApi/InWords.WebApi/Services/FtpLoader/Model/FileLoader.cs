using FluentFTP;
using Microsoft.Extensions.Options;
using System;
using System.IO;
using System.Net;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.FtpLoader.Model
{
    public class FileLoader
    {
        private readonly FtpCredentials ftpCredentials;

        public FileLoader(IOptions<FtpCredentials> config)
        {
            ftpCredentials = config.Value;
        }

        public async Task<string> UploadAsync(string filePath, ProjectDirectories directory)
        {
            await using Stream stream = new FileStream(filePath, FileMode.Open);

            string fileFormat = filePath.Substring(filePath.LastIndexOf('.'));

            string filename = $"{Guid.NewGuid()}".Replace("-", "").Substring(0, 16) + fileFormat.ToLower();

            using FtpClient client = GetConnectedClient();

            string directoryPath = ProjectDirectory.Resolve(directory);

            client.CreateDirectory(directoryPath);

            string path = Path.Combine(directoryPath, filename);

            await client.UploadAsync(stream, path).ConfigureAwait(false);

            return Path.Combine(ftpCredentials.DirectoryPath, path).Replace(@"\", "/");
        }

        public async Task DeleteAsync(string path)
        {
            path = path.Replace(ftpCredentials.DirectoryPath, "");
            using FtpClient client = GetConnectedClient();
            if (await client.FileExistsAsync(path).ConfigureAwait(false))
            {
                await client.DeleteFileAsync(path).ConfigureAwait(false);
            }
        }

        private FtpClient GetConnectedClient()
        {
            //TODO Inject client
            var client = new FtpClient(ftpCredentials.Server)
            {
                Credentials = new NetworkCredential(ftpCredentials.Login, ftpCredentials.Password)
            };
            client.Connect();
            return client;
        }
    }
}