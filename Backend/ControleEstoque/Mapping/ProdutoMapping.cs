using ControleEstoque.Models;
using System.Data.Entity.ModelConfiguration;

namespace ControleEstoque.Mapping
{
    public class ProdutoMapping : EntityTypeConfiguration<Produto>, IMapping
    {
        public ProdutoMapping()
        {
            this.ToTable("tblProduto");
            this.HasKey(x => x.Id);
            this.Property(x => x.Id);
            this.Property(x => x.Nome).IsRequired().HasMaxLength(100);
            this.Property(x => x.QuantidadeItens).IsRequired();
            this.Property(x => x.ValorUnitario).IsRequired();
        }
    }
}