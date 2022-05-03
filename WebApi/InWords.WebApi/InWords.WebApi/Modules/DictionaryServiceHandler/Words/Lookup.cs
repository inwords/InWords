using Grpc.Core;
using InWords.Data;
using InWords.Protobuf;
using InWords.WebApi.Services.Abstractions;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Modules.DictionaryServiceHandler.Words
{
	public class Lookup : StructRequestHandler<LookupRequest, LookupReply, InWordsDataContext>
	{
		private static string requestKey = "";
		private readonly IHttpClientFactory clientFactory;
		[System.Diagnostics.CodeAnalysis.SuppressMessage("Design", "CA1062:Проверить аргументы или открытые методы", Justification = "<Ожидание>")]
		public Lookup(InWordsDataContext context,
			IConfiguration configuration,
			IHttpClientFactory clientFactory) : base(context)
		{
			if (string.IsNullOrWhiteSpace(requestKey))
			{
				requestKey = configuration.GetSection("Yandex").GetValue<string>("Dictionary");
			}
			this.clientFactory = clientFactory;
		}

		public override async Task<LookupReply> HandleRequest(RequestObject<LookupRequest, LookupReply> request, CancellationToken cancellationToken = default)
		{
			if (request == null)
				throw new ArgumentNullException(nameof(request));

			LookupReply lookupReply;
			LookupRequest requestData = request.Value;
			Uri requestUri = new Uri($"https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key={requestKey}&lang={requestData.Lang}&text={requestData.Text}");
			using var client = clientFactory.CreateClient();
			var response = await client.GetAsync(requestUri).ConfigureAwait(false);

			if (response.IsSuccessStatusCode)
			{
				var responseString = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
				var json = JsonConvert.DeserializeObject<Root>(responseString);

				lookupReply = new LookupReply();
				lookupReply.Head = new LookupReply.Types.Head();
				if (json is null) return new LookupReply();
				foreach (var def in json.def)
				{
					var gDef = new LookupReply.Types.Def()
					{
						Pos = def.pos,
						Text = def.text,
						Ts = def.ts
					};

					foreach (var tr in def.tr)
					{
						gDef.Tr.Add(new LookupReply.Types.Tr()
						{
							Text = tr.text,
						});
					}
					lookupReply.Def.Add(gDef);
				}
			}
			else
			{
				request.StatusCode = StatusCode.Aborted;
				lookupReply = new LookupReply();
			}

			return lookupReply;
		}
	}
}

public class Head
{
}

public class Syn
{
	public string text { get; set; }
	public string pos { get; set; }
	public string gen { get; set; }
	public int fr { get; set; }
	public string asp { get; set; }
}

public class Mean
{
	public string text { get; set; }
}

public class Tr
{
	public string text { get; set; }
	public string pos { get; set; }
	public string gen { get; set; }
	public int fr { get; set; }
	public List<Syn> syn { get; set; }
	public List<Mean> mean { get; set; }
	public List<Ex> ex { get; set; }
	public string asp { get; set; }
}

public class Ex
{
	public string text { get; set; }
	public List<Tr> tr { get; set; }
}

public class Def
{
	public string text { get; set; }
	public string pos { get; set; }
	public string ts { get; set; }
	public List<Tr> tr { get; set; }
}

public class Root
{
	public Head head { get; set; }
	public List<Def> def { get; set; }
}


