using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace InWords.Auth
{
    // TODO <T>
    internal class FileProvider
    {
        public string FilePath { get; set; }

        public FileProvider(string path)
        {
            FilePath = path;
        }

        public async void Save(string context)
        {
            EnsureFileFolder();
            using (var writer = new StreamWriter(FilePath))
            {
                await writer.WriteAsync(context);
            }

        }

        public string Open()
        {
            EnsureFileFolder();
            string result = string.Empty;
            try
            {
                using (var reader = new StreamReader(FilePath))
                {
                    result = reader.ReadToEnd();
                }
            }
            catch (Exception e)
            {
                Debug.Write(e);
            }

            return result;
        }

        private void EnsureFileFolder()
        {
            try
            {
                string dirName = new DirectoryInfo(FilePath).Name;
                if (!Directory.Exists(dirName)) Directory.CreateDirectory(dirName);
                if (File.Exists(FilePath)) return;
                FileStream x = File.Create(FilePath);
                x.Dispose();
            }
            catch
            {
                //todo log
            }
        }
    }
}
