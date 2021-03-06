﻿using Grpc.Core;
using InWords.Data;
using InWords.Protobuf;
using InWords.Service.Auth.Interfaces;
using InWords.Service.Auth.Models;
using InWords.WebApi.Services.Abstractions;
using InWords.WebApi.Services.Email.Abstractions;
using InWords.WebApi.Services.Users.Extentions;
using InWords.WebApi.Services.Users.Models;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace InWords.WebApi.Services.Users.Registration
{
	public class UserRegistration : StructRequestHandler<RegistrationRequest, TokenReply, InWordsDataContext>
	{
		private readonly IEmailVerifierService emailVerifierService;
		private readonly IJwtProvider jwtProvider;
		public UserRegistration(InWordsDataContext context,
			IJwtProvider jwtProvider,
			IEmailVerifierService emailVerifierService) : base(context)
		{
			this.jwtProvider = jwtProvider;
			this.emailVerifierService = emailVerifierService;
		}

		/// <summary>
		/// Use this is to register new yousers
		/// </summary>
		/// <param name="request"></param>
		/// <param name="cancellationToken"></param>
		/// <exception cref="ArgumentNullException">If request is null</exception>
		/// <exception cref="ArgumentException">If email not exist</exception>
		/// <returns></returns>
		public async override Task<TokenReply> HandleRequest(RequestObject<RegistrationRequest, TokenReply> request,
			CancellationToken cancellationToken = default)
		{
			if (request == null)
				throw new ArgumentNullException(nameof(request));

			if (request == null)
			{
				request = new RequestObject<RegistrationRequest, TokenReply>(new RegistrationRequest())
				{
					StatusCode = StatusCode.NotFound
				};
				request.Detail = $"{nameof(request)} is null";
				return new TokenReply();
			}

			RegistrationRequest requestData = request.Value;

			if (IsAccountExist(requestData.Email))
			{
				request.StatusCode = StatusCode.AlreadyExists;
				request.Detail = "Email already exist";
				return new TokenReply();
			}

			// this code work in only in valid satate

			string nickname = NicknameGenerator.FromEmail(requestData.Email);

			AccountRegistration accountRegistration = new AccountRegistration(requestData.Email, requestData.Password, nickname);

			Context.Accounts.Add(accountRegistration.Account);

			await Context.SaveChangesAsync();

			if (!requestData.IsAnonymous)
			{
				// send verifier email
				await emailVerifierService
					.InstatiateVerifierMessage(accountRegistration.Account.User, accountRegistration.Account.Email)
					.ConfigureAwait(false);
			}

			// generate token
			TokenResponse tokenResponse = new TokenResponse(accountRegistration.Account.AccountId, accountRegistration.Account.Role, jwtProvider);
			TokenReply registrationReply = new TokenReply
			{
				UserId = tokenResponse.UserId,
				Token = tokenResponse.Token
			};

			return registrationReply;
		}

		/// <summary>
		/// This method check if email exist
		/// </summary>
		/// <exception cref="ArgumentException">Email already exist</exception>
		/// <param name="email"></param>
		public bool IsAccountExist(string email)
		{
			return Context.Accounts.Any(a => a.Email.ToLower() == email.ToLower());
		}
	}
}
