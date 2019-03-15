using System;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;

namespace InWords.Auth.Models
{
    internal class SecurityFileProvider
    {
        #region Props
        private static readonly string AlphabetFIlePath = null;

        internal readonly string FilePath = null;

        internal string SymmetricSecurityKey { get; private set; }

        private static readonly Random Random = null;
        #endregion

        #region Ctor
        static SecurityFileProvider()
        {
            AlphabetFIlePath = "alphabet.security";
            Random = new Random();
        }

        internal SecurityFileProvider(string filePath)
        {
            FilePath = filePath;
        }
        #endregion

        internal async Task<string> ReadAllFromFile(string filePath)
        {
            EnsureFileFolder();
            string result = null;
            try
            {
                using (var reader = new StreamReader(filePath))
                {
                    result = await reader.ReadToEndAsync(); //do i need read to end async?
                }
            }
            catch (Exception)
            {
                //TODO journal
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
                throw; //todo journal
            }
        }

        private void EnsureFileFolder()
        {
            try
            {
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

        private async Task<string> RandomString(int length)
        {
            string chars = await ReadAllFromFile(AlphabetFIlePath);

            if (!string.IsNullOrEmpty(chars))
                return new string(Enumerable.Repeat(chars, length)
                    .Select(s => s[Random.Next(s.Length)]).ToArray());

            chars = "asdfghjkl;'zxcvbnm,./qwertyuiop[]";
            WriteAllInFIle(AlphabetFIlePath, chars);

            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[Random.Next(s.Length)]).ToArray());
        }

        internal SecurityKey GetSymmetricSecurityKey()
        {
            if (string.IsNullOrEmpty(SymmetricSecurityKey))
            {
                SymmetricSecurityKey = Task.Run(() => RandomString(Random.Next(128, 256))).Result;
            }
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(SymmetricSecurityKey));
        }
    }
}
