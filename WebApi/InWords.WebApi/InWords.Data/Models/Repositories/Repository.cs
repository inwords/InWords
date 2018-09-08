namespace InWords.Data.Models.Repositories
{
    using System.Collections.Generic;
    using System.Linq;
    using Microsoft.EntityFrameworkCore;

    public class Repository<TEntity> where TEntity : class
    {
        private DbContext context = null;

        protected DbSet<TEntity> DbSet
        {
            get;
            set;
        }

        public Repository()
        {
            context = new InWordsDataContext();
            DbSet = context.Set<TEntity>();
        }

        public Repository(DbContext dataContext)
        {
            context = dataContext;
        }

        public List<TEntity> GetAll()
        {
            return DbSet.ToList();
        }


        public TEntity Get(int id)
        {
            return DbSet.Find(id);
        }

        public void Add(TEntity entity)
        {
            DbSet.Add(entity);
        }

        public void SaveChanges()
        {
            context.SaveChanges();
        }

        public void Update(TEntity entity)
        {
            // Настройки контекста
            context.Entry(entity).State = EntityState.Modified;
            context.SaveChanges();
        }

        public int Count()
        {
            return DbSet.Count();
        }
    }
}
