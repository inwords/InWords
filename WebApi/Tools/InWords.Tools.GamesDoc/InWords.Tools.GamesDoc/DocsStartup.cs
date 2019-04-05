using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading;
using System.Timers;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Docs.v1;
using Google.Apis.Docs.v1.Data;
using Google.Apis.Services;
using Google.Apis.Util.Store;

namespace InWords.Tools.GamesDoc
{
    public class DocsStartup
    {
        // If modifying these scopes, delete your previously saved credentials
        // ReSharper disable once CommentTypo
        // at ~/.credentials/docs.googleapis.com-dotnet-quickstart.json
        private static readonly string[] Scopes = { DocsService.Scope.Documents };
        private const string APPLICATION_NAME = "Google Docs API .NET Quickstart";
        private const string CRED_FILE = "credentials.security.json";
        private const string TOKEN_FILE = "token.security.json";

        public static string Invoke()
        {
            UserCredential credential;

            using (var stream = new FileStream(CRED_FILE, FileMode.Open, FileAccess.Read))
            {
                credential = GoogleWebAuthorizationBroker.AuthorizeAsync(
                    GoogleClientSecrets.Load(stream).Secrets,
                    Scopes,
                    "user",
                    CancellationToken.None,
                    new FileDataStore(TOKEN_FILE, true)).Result;
                Console.WriteLine("Credential file saved to: " + TOKEN_FILE);
            }

            // Create Google Docs API service.
            var service = new DocsService(new BaseClientService.Initializer
            {
                HttpClientInitializer = credential,
                ApplicationName = APPLICATION_NAME
            });

            // Define request parameters.
            // ReSharper disable once StringLiteralTypo
            const string documentId = "1-SUfBAAJutCcb-bZHEfqGmiOO7Lh4uoSwpnBuDa-v6A";
            DocumentsResource.GetRequest request = service.Documents.Get(documentId);

            // Prints the title of the requested doc:
            // https://docs.google.com/document/d/1-SUfBAAJutCcb-bZHEfqGmiOO7Lh4uoSwpnBuDa-v6A/edit?usp=sharing
            Document doc = request.Execute();
            Console.WriteLine("The title of the doc is: {0}", doc.Body.Content);

            return ReadStructuralElements(doc.Body.Content);

        }

        private static string ReadStructuralElements(IEnumerable<StructuralElement> elements)
        {
            var sb = new StringBuilder();
            foreach (StructuralElement element in elements)
            {
                if (element.Paragraph != null)
                {
                    foreach (ParagraphElement paragraphElement in element.Paragraph.Elements)
                    {
                        sb.Append(ReadParagraphElement(paragraphElement));
                    }
                }
                else if (element.Table != null)
                {
                    // The text in table cells are in nested Structural Elements and tables may be
                    // nested.
                    foreach (TableRow row in element.Table.TableRows)
                    {
                        foreach (TableCell cell in row.TableCells)
                        {
                            sb.Append(ReadStructuralElements(cell.Content));
                        }
                    }
                }
                else if (element.TableOfContents != null)
                {
                    // The text in the TOC is also in a Structural Element.
                    sb.Append(ReadStructuralElements(element.TableOfContents.Content));
                }
            }


            return sb.ToString();
        }

        private static string ReadParagraphElement(ParagraphElement element)
        {
            TextRun run = element.TextRun;
            string result = run?.Content ?? "";
            return result;
        }
    }
}