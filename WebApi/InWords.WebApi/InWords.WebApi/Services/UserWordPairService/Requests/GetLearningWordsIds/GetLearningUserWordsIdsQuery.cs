﻿using System.Collections.Generic;
using InWords.Data.DTO;
using InWords.WebApi.Services.UserWordPairService.Requests.Abstractions;
using MediatR;

namespace InWords.WebApi.Services.UserWordPairService.Requests.GetLearningWordsIds
{
    public class GetLearningUserWordsIdsQuery : GetLearningUserWordsQueryBase, IRequest<List<int>>
    {
        public GetLearningUserWordsIdsQuery(int userId) : base(userId)
        {
        }
    }
}