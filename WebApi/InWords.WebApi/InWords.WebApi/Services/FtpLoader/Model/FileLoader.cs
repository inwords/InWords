﻿using System;
using System.Net;
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

        public void Test()
        {
            // create an FTP client
            // if you don't specify login credentials, we use the "anonymous" user account
            var client = new FtpClient(ftpCredentials.Server)
            {
                Credentials = new NetworkCredential(ftpCredentials.Login, ftpCredentials.Password)
            };
            client.Connect();

            // get a list of files and directories in the "/http" folder
            foreach (FtpListItem item in client.GetListing("/http/InWords/Resource/Drawable"))
                // if this is a file

                if (item.Type == FtpFileSystemObjectType.File)
                {
                    // get the file size
                    long size = client.GetFileSize(item.FullName);

                    // get modified date/time of the file or folder
                    DateTime time = client.GetModifiedTime(item.FullName);
                }

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

            // disconnect! good bye!
            client.Disconnect();
            client.Dispose();
        }

        public bool Connect()
        {
            return true;
        }
    }
}