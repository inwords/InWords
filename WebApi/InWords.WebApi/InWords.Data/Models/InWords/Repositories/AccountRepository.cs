namespace InWords.Data.Models
{
    public class AccountRepository : Repository<Account>
    {
        private readonly InWordsDataContext context;

        public AccountRepository(InWordsDataContext context) : base(context)
        {
            this.context = context;
        }
        //todo cascade account removing
    }
}
