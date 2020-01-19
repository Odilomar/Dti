using ControleEstoque.Mapping;

namespace ControleEstoque.Models
{
    public class ProdutoRepository : BaseContext<Produto>, IUnitOfWork<Produto>
    {
    }
}