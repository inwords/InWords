using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;

namespace InWords.Auth
{
    internal class SecurityFileProvider
    {
        private readonly static string alphabetFIlePath = null;

        internal readonly string FilePath = null;

        internal string SymmetricSecurityKey { get; private set; }

        private static readonly Random random = null;

        static SecurityFileProvider()
        {
            alphabetFIlePath = "alphabet.security";
            random = new Random();
        }

        internal SecurityFileProvider(string filePath)
        {
            FilePath = filePath;
        }

        internal async Task<string> ReadAllFromFile(string filePath)
        {
            EnsureFileFolder();
            string result = null;
            try
            {
                using (var reader = new StreamReader(filePath))
                {
                    result = await reader.ReadToEndAsync(); //do i need readtoend async?
                }
            }
            catch (Exception)
            {

            }
            return result;
        }

        internal async void WriteAllInFIle(string filePath, string key)
        {
            EnsureFileFolder();
            try
            {
                using (var writer = new StreamWriter(filePath))
                {
                    await writer.WriteAsync(key);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        private void EnsureFileFolder()
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

        public async Task<string> RandomString(int length)
        {
            string chars = await ReadAllFromFile(alphabetFIlePath);

            if (string.IsNullOrEmpty(chars))
            {
                chars = "asdfghjkl;'zxcvbnm,./qwertyuiop[]";
                WriteAllInFIle(alphabetFIlePath, chars);
            }

            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        internal SecurityKey GetSymmetricSecurityKey()
        {
            if (string.IsNullOrEmpty(SymmetricSecurityKey))
            {
                SymmetricSecurityKey = Task.Run(() => RandomString(random.Next(128, 256))).Result;
            }
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(SymmetricSecurityKey));
        }
    }
}
