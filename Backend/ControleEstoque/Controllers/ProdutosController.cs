using ControleEstoque.Mapping;
using ControleEstoque.Models;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;

namespace ControleEstoque.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class ProdutosController : ApiController
    {
        private IUnitOfWork<Produto> _unitOfWorkProduto { get; set; }

        public ProdutosController()
        {
            this._unitOfWorkProduto = new ProdutoRepository();
        }

        public IEnumerable<Produto> Get()
        {
            return this._unitOfWorkProduto.GetAll();
        }

        public object Get(int id)
        {
            var model = this._unitOfWorkProduto.GetById(id);
            if(model != null)
            {
                return model;
            }
            return NotFound();
            
        }
        public IHttpActionResult Post(Produto produto)
        {
            this._unitOfWorkProduto.Save(produto);
            return Ok();
        }

        public void Put(int id, Produto produto)
        {
            this._unitOfWorkProduto.Update(produto);
        }

        public void Delete(int id)
        {
            var model = this._unitOfWorkProduto.GetById(id);
            this._unitOfWorkProduto.Delete(model);
        }
    }
}
