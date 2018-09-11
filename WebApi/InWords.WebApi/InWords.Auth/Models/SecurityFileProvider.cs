using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace InWords.Auth
{
    internal class SecurityFileProvider
    {
        internal readonly string FilePath = null;

        internal SecurityFileProvider(string filePath)
        {
            FilePath = filePath;
            CreateFileInFolder();
        }

        /// <summary>
        /// Read key from file
        /// </summary>
        /// <returns>Token key</returns>
        internal string ReadKeyFromFile()
        {
            //read key
            //todo async?

            string result = null;
            try
            {
                using (var reader = new StreamReader(FilePath))
                {
                    result = reader.ReadToEnd(); //do i need readtoend async?
                }
            }
            catch (Exception)
            {

            }
            return result;
        }


        internal void WriteKeyInFIle(string key)
        {
            try
            {
                using (var writer = new StreamWriter(FilePath))
                {
                    writer.Write(key);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }


        private void CreateFileInFolder()
        {
            try
            {
                //todo multilevel check
                string dirName = new DirectoryInfo(FilePath).Name;
                if (!Directory.Exists(dirName))
                {
                    Directory.CreateDirectory(dirName);
                }
                if (!File.Exists(FilePath))
                {
                    File.Create(FilePath);
                }
            }
            catch
            {
                //todo log
            }
        }
    }
}
