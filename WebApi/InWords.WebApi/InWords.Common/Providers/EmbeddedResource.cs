namespace InWords.Common
{
    using System;
    using System.IO;
    using System.Reflection;
    using System.Text;

    public static class EmbeddedResource
    {
        public static string GetApiRequestFile(string namespaceAndFileName, Assembly assembly)
        {
            try
            {
                using (var stream = assembly.GetManifestResourceStream(namespaceAndFileName))
                {
                    using (var reader = new StreamReader(stream, Encoding.UTF8))
                    {
                        return reader.ReadToEnd();
                    }
                }
            }

            catch (Exception exception)
            {
                //ApplicationProvider.WriteToLog<EmbeddedResource>().Error(exception.Message);
                throw new Exception($"Failed to read Embedded Resource {namespaceAndFileName}" +
                    $"{Environment.NewLine} {exception.Message}");
            }
        }
    }

}
