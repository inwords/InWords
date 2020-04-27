using System;
using System.Diagnostics.CodeAnalysis;

namespace InWords.WebApi.Services.UserWordPairService.Models
{
    public struct Memorization : IEquatable<Memorization>
    {
        public short Period { get; set; }
        public DateTime RepeatTime { get; set; }

        public override bool Equals(object? obj)
        {
            return obj is Memorization license &&
                   Period == license.Period &&
                   RepeatTime == license.RepeatTime;
        }

        public bool Equals([AllowNull] Memorization other)
        {
            return Period == other.Period && RepeatTime == other.RepeatTime;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Period, RepeatTime);
        }

        public static bool operator ==(Memorization left, Memorization right)
        {
            return left.Equals(right);
        }

        public static bool operator !=(Memorization left, Memorization right)
        {
            return !(left == right);
        }
    }
}