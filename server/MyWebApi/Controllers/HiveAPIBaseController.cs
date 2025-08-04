using Trainees.Models.Interfaces.Base;
using Newtonsoft.Json;
using System.Web.Http;
using System.Web.Http.Results;

namespace MyWebApi.Controllers
{
    public abstract class HiveAPIBaseController : ApiController
    {
        /// database unit of work object
        protected IUnitOfWork dataUnitOfWork;

        public HiveAPIBaseController(IUnitOfWork _dataUnitOfWork)
        {
            dataUnitOfWork = _dataUnitOfWork;
        }

        protected JsonResult<T> InterfaceJson<T>(T content)
        {
            var settings = new JsonSerializerSettings()
            {
                TypeNameHandling = TypeNameHandling.Auto
            };
            return Json(content, settings);
        }
    }
}