namespace InWords.Data.Models.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Linq.Expressions;
    using System.Threading.Tasks;
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

        public Task<TEntity> GetAsync(int id)
        {
            return DbSet.FindAsync(id);
        }

        public void Add(TEntity entity)
        {
            DbSet.Add(entity);
        }

        public void SaveChanges()
        {
            context.SaveChanges();
        }

        public Task SaveChangesAsync()
        {
            return context.SaveChangesAsync();
        }

        public void Update(TEntity entity)
        {
            // Настройки контекста
            context.Entry(entity).State = EntityState.Modified;
        }

        public void Remove(TEntity entity)
        {

        }

        public virtual int Count()
        {
            return DbSet.Count();
        }

        public bool ExistAny(Expression<Func<TEntity,bool>> predicate)
        {
            return DbSet.Any(predicate);
        }

        //bad pattern
        private DbSet<TEntity> GetDbSet()
        {
            return DbSet;
        }
    }
}
