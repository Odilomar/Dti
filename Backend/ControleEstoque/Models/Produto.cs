using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ControleEstoque.Models
{
    [Table("tblProduto")]
    public class Produto
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(100)]
        public string Nome { get; set; }
        public int QuantidadeItens { get; set; }
        public double ValorUnitario { get; set; }
    }
}