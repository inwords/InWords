using MediatR;
using System;
using System.Collections.Generic;

namespace InWords.Data.DTO.GameBox.LevelMetric
{
    [Obsolete]
    public class LevelMetricQuery : IRequest<LevelMetricQueryResult>
    {
        [field: NonSerialized] public int UserId { get; set; }

        public int GameLevelId { get; set; }
        public Dictionary<int, int> WordPairIdOpenCounts { get; set; }
    }
}