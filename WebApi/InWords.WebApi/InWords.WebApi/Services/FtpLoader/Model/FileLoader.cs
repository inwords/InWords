using System;
using System.IO;
using System.Net;
using System.Threading.Tasks;
using FluentFTP;
using Microsoft.Extensions.Options;

namespace InWords.WebApi.Services.FtpLoader.Model
{
    public class FileLoader
    {
        private readonly FtpCredentials ftpCredentials;

        public FileLoader(IOptions<FtpCredentials> config)
        {
            ftpCredentials = config.Value;
        }

        public async Task<string> UploadAsync(Stream stream, ProjectDirectories directory, string filename = null,string fileFormat = null)
        {
            if (string.IsNullOrWhiteSpace(fileFormat))
                fileFormat = ".tmp";

            if (string.IsNullOrWhiteSpace(filename))
                filename = $"{Guid.NewGuid()}".Replace("-", "").Substring(0, 16) + fileFormat;

            using FtpClient client = GetConnectedClient();

            string directoryPath = ProjectDirectory.Resolve(directory);

            client.CreateDirectory(directoryPath);
            string path = Path.Combine(directoryPath, filename);

            await client.UploadAsync(stream, path).ConfigureAwait(false);

            var x = Path.Combine(ftpCredentials.DirectoryPath, path).Replace(@"\", "/").ToLower();

            return x;
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



        //private void Test()
        //{
        //    // create an FTP client
        //    // if you don't specify login credentials, we use the "anonymous" user account
        //    var client = new FtpClient(ftpCredentials.Server)
        //    {
        //        Credentials = new NetworkCredential(ftpCredentials.Login, ftpCredentials.Password)
        //    };
        //    client.Connect();

        //    // get a list of files and directories in the "/http" folder
        //    foreach (FtpListItem item in client.GetListing("/http/InWords/Resource/Drawable"))
        //        // if this is a file

        //        if (item.Type == FtpFileSystemObjectType.File)
        //        {
        //            // get the file size
        //            long size = client.GetFileSize(item.FullName);

        //            // get modified date/time of the file or folder
        //            DateTime time = client.GetModifiedTime(item.FullName);
        //        }

        //// upload a file
        //client.UploadFile(@"C:\MyVideo.mp4", "/http/MyVideo.mp4");

        //// rename the uploaded file
        //client.Rename("/http/MyVideo.mp4", "/http/MyVideo_2.mp4");

        //// download the file again
        //client.DownloadFile(@"C:\MyVideo_2.mp4", "/http/MyVideo_2.mp4");

        //// delete the file
        //client.DeleteFile("/http/MyVideo_2.mp4");

        //// delete a folder recursively
        //client.DeleteDirectory("/http/extras/");

        //// check if a file exists
        //if (client.FileExists("/http/big2.txt"))
        //{
        //}

        //// check if a folder exists
        //if (client.DirectoryExists("/http/extras/"))
        //{
        //}

        //// upload a file and retry 3 times before giving up
        //client.RetryAttempts = 3;
        //client.UploadFile(@"C:\MyVideo.mp4", "/http/big.txt", FtpExists.Overwrite, false, FtpVerify.Retry);

        //// disconnect! good bye!
        //client.Disconnect();
        //client.Dispose();
    }
}