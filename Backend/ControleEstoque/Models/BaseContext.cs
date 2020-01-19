using ControleEstoque.Mapping;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Web;

namespace ControleEstoque.Models
{
    public class BaseContext<T> : DbContext where T : class
    {

        public BaseContext():base("ProductConnection")
        {
            Database.SetInitializer<BaseContext<T>>(null);
        }
        public DbSet<Produto> Produtos { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //Fazendo o mapeamento com o banco de dados
            //Pega todas as classes que estão implementando a interface IMapping
            //Assim o Entity Framework é capaz de carregar os mapeamentos
            var typesToMapping = (from x in Assembly.GetExecutingAssembly().GetTypes()
                                  where x.IsClass && typeof(IMapping).IsAssignableFrom(x)
                                  select x).ToList();
            // Varrendo todos os tipos que são mapeamento 
            // Com ajuda do Reflection criamos as instancias 
            // e adicionamos no Entity Framework
            foreach (var mapping in typesToMapping)
            {
                dynamic mappingClass = Activator.CreateInstance(mapping);
                modelBuilder.Configurations.Add(mappingClass);
            }

        }

        public virtual void ChangeObjectState(object model, EntityState state)
        {
            //Aqui trocamos o estado do objeto, 
            //facilita quando temos alterações e exclusões
            ((IObjectContextAdapter)this)
                          .ObjectContext
                          .ObjectStateManager
                          .ChangeObjectState(model, state);
        }

        public virtual int Save(Produto model)
        {
            this.Produtos.Add(model);
            return this.SaveChanges();
        }
        public virtual int Update(Produto model)
        {
            var entry = this.Entry(model);
            if (entry.State == EntityState.Detached)
                this.Produtos.Attach(model);
            this.ChangeObjectState(model, EntityState.Modified);
            return this.SaveChanges();
        }
        public virtual void Delete(Produto model)
        {
            var entry = this.Entry(model);
            if (entry.State == EntityState.Detached)
                this.Produtos.Attach(model);
            this.ChangeObjectState(model, EntityState.Deleted);
            this.SaveChanges();
        }
        public virtual IEnumerable<Produto> GetAll()
        {
            return this.Produtos.ToList();
        }
        public virtual Produto GetById(object id)
        {
            return this.Produtos.Find(id);
        }
        public virtual IEnumerable<Produto> Where(Expression<Func<Produto, bool>> expression)
        {
            return this.Produtos.Where(expression);
        }
        public IEnumerable<Produto> OrderBy(Expression<Func<Produto, bool>> expression)
        {
            return this.Produtos.OrderBy(expression);
        }
    }
}