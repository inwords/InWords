using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace InWords.Data.Interpface
{
    public interface IGenericRepository<TEntity> where TEntity : class
    {
        Task<TEntity> Create(TEntity item);
        Task<TEntity> FindById(int id);
        IEnumerable<TEntity> Get();
        IEnumerable<TEntity> Get(Func<TEntity, bool> predicate);
        void Remove(TEntity item);
        Task<TEntity> Update(TEntity item);
    }
}
