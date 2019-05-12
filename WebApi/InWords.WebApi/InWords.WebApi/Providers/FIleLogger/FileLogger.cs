using System;
using System.IO;
using System.Text;
using InWords.WebApi.Extensions;
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

            LogFile($"[{logLevel.ToString().Remove(3)}] {formatter(state, exception)}");

            if (logLevel.Equals(LogLevel.Error)) LogException(exception);
        }

        private void LogFile(string content)
        {
            lock (_lock)
            {
                File.AppendAllText(filePath, $"{content}{Environment.NewLine}");
            }
        }

        private void LogException(Exception exception)
        {
            var errorStringBuilder = new StringBuilder();
            errorStringBuilder.AppendLineIfExist(exception.Message, "Message");
            errorStringBuilder.AppendLineIfExist(exception.HelpLink, "HelpLink");
            errorStringBuilder.AppendLineIfExist(exception.Source, "Source");
            errorStringBuilder.AppendLineIfExist(exception.StackTrace, "StackTrace");
            errorStringBuilder.AppendLineIfExist(exception.Data?.ToString(), "Data");
            LogFile(errorStringBuilder.ToString());
        }
    }
}