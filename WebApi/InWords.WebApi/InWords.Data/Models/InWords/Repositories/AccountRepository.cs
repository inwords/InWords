namespace InWords.Data.Models
{
    public class AccountRepository : Repository<Account>
    {

        public AccountRepository(InWordsDataContext context) : base(context)
        {

        }
        //todo cascade account removing
    }
}
