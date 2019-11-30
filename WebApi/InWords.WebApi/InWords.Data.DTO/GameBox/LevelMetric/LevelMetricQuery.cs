using System;
using MediatR;
using System.Collections.Generic;

namespace InWords.Data.DTO.GameBox.LevelMetric
{
    public class LevelMetricQuery : IRequest<LevelMetricQueryResult>
    {
        [field: NonSerialized] public int UserId { get; set; }

        public int GameLevelId { get; set; }
        public Dictionary<int, int> WordPairIdOpenCounts { get; set; }
    }
}