using InWords.Protobuf;
using Swashbuckle.AspNetCore.Filters;
using static InWords.Protobuf.CardGameInfos.Types;

namespace InWords.WebApi.Swagger.Examples
{
    public class CardGameInfosExample : IExamplesProvider<CardGameInfos>
    {
        public CardGameInfos GetExamples()
        {
            CardGameInfos cardGameInfos = new CardGameInfos();
            CardGameInfo cardGameInfo1 = new CardGameInfo();
            cardGameInfo1.WordIdOpenCount.Add(1, 2);
            cardGameInfo1.WordIdOpenCount.Add(3, 4);

            CardGameInfo cardGameInfo2 = new CardGameInfo();
            cardGameInfo2.WordIdOpenCount.Add(6, 7);
            cardGameInfo2.WordIdOpenCount.Add(4, 2);

            CardGameInfo cardGameInfo3 = new CardGameInfo();
            cardGameInfo3.WordIdOpenCount.Add(7, 9);
            cardGameInfo3.WordIdOpenCount.Add(4, 1);

            cardGameInfos.Info.Add(cardGameInfo1);
            cardGameInfos.Info.Add(cardGameInfo2);
            cardGameInfos.Info.Add(cardGameInfo3);

            return cardGameInfos;
        }
    }
}
