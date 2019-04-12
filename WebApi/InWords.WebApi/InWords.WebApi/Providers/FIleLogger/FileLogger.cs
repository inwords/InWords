using System;
using System.IO;
using Microsoft.Extensions.Logging;

namespace InWords.WebApi.Providers.FIleLogger
{
    public class FileLogger : ILogger
    {
        private readonly object _lock = new object();
        private readonly string filePath;

        public FileLogger(string path)
        {
            filePath = path;
            Directory.CreateDirectory(Path.GetDirectoryName(filePath));
        }

        public IDisposable BeginScope<TState>(TState state)
        {
            return null;
        }

        public bool IsEnabled(LogLevel logLevel)
        {
            //return logLevel == LogLevel.Trace;
            return true;
        }

        public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception exception,
            Func<TState, Exception, string> formatter)
        {
            if (formatter == null) return;

            lock (_lock)
            {
                File.AppendAllText(filePath, formatter(state, exception) + Environment.NewLine);
            }
        }
    }
}