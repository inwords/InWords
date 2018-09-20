namespace InWords.Data.Models.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Linq.Expressions;
    using System.Threading.Tasks;
    using InWords.Data.Interpface;
    using Microsoft.EntityFrameworkCore;

    public class Repository<TEntity> : IGenericRepository<TEntity> where TEntity : class
    {
        private readonly DbContext context = null;
        protected readonly DbSet<TEntity> dbSet;

        public Repository(DbContext context)
        {
            this.context = context;
            this.dbSet = context.Set<TEntity>();
        }

        public async Task<TEntity> Create(TEntity item)
        {
            dbSet.Add(item);
            await context.SaveChangesAsync();
            return item;
        }

        public async Task<TEntity> FindById(int id)
        {
            return await dbSet.FindAsync(id);
        }

        public IEnumerable<TEntity> Get()
        {
            return dbSet.AsNoTracking().AsEnumerable();
        }

        public IEnumerable<TEntity> Get(Func<TEntity, bool> predicate)
        {
            return dbSet.AsNoTracking().Where(predicate).ToList();
        }

        /// <summary>
        /// Async remove from DataBase
        /// </summary>
        /// <param name="item"></param>
        public async void Remove(TEntity item)
        {
            context.Entry(item).State = EntityState.Modified;
            await context.SaveChangesAsync();
        }

        public async Task<TEntity> Update(TEntity item)
        {
            context.Entry(item).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return item;
        }

        #region Include

        /// <summary>
        /// Exapmle: IEnumerable<Phone> phones = phoneRepo.GetWithInclude(x=>x.Company.Name.StartsWith("S"), p=>p.Company);
        /// </summary>
        /// <param name="includeProperties"></param>
        /// <returns></returns>
        public IEnumerable<TEntity> GetWithInclude(params Expression<Func<TEntity, object>>[] includeProperties)
        {
            return Include(includeProperties).ToList();
        }

        public IEnumerable<TEntity> GetWithInclude(Func<TEntity, bool> predicate,
            params Expression<Func<TEntity, object>>[] includeProperties)
        {
            var query = Include(includeProperties);
            return query.Where(predicate).ToList();
        }

        private IQueryable<TEntity> Include(params Expression<Func<TEntity, object>>[] includeProperties)
        {
            IQueryable<TEntity> query = dbSet.AsNoTracking();
            return includeProperties
                .Aggregate(query, (current, includeProperty) => current.Include(includeProperty));
        }

        #endregion

        public bool ExistAny(Expression<Func<TEntity, bool>> predicate)
        {
            return dbSet.Any(predicate);
        }

        //public Repository()
        //{
        //    context = new InWordsDataContext();
        //    DbSet = context.Set<TEntity>();
        //}

        //public Repository(DbContext dataContext)
        //{
        //    context = dataContext;
        //    DbSet = context.Set<TEntity>();
        //}


        //public List<TEntity> GetAll()
        //{
        //    return DbSet.ToList();
        //}

        //public TEntity Get(int id)
        //{
        //    return DbSet.Find(id);
        //}

        //public Task<TEntity> GetAsync(int id)
        //{
        //    return DbSet.FindAsync(id);
        //}

        //public TEntity Add(TEntity entity)
        //{
        //    return DbSet.Add(entity).Entity;
        //}

        //public void SaveChanges()
        //{
        //    context.SaveChanges();
        //}

        //public Task SaveChangesAsync()
        //{
        //    return context.SaveChangesAsync();
        //}

        //public void Update(TEntity entity)
        //{
        //    // Настройки контекста
        //    context.Entry(entity).State = EntityState.Modified;
        //}

        //public void Remove(TEntity entity)
        //{

        //}

        //public virtual int Count()
        //{
        //    return DbSet.Count();
        //}

        ////bad pattern
        //private DbSet<TEntity> GetDbSet()
        //{
        //    return DbSet;
        //}
    }
}
