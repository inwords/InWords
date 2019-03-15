namespace InWords.Data.Interfaces
{
    using System;
    using System.Threading.Tasks;
    using System.Collections.Generic;

    public interface IGenericRepository<TEntity> where TEntity : class
    {
        Task<TEntity> Create(TEntity item);
        Task<TEntity> FindById(int id);
        IEnumerable<TEntity> Get();
        IEnumerable<TEntity> Get(Func<TEntity, bool> predicate);
        Task<int> Remove(params TEntity[] item);
        Task<TEntity> Update(TEntity item);
    }
}
