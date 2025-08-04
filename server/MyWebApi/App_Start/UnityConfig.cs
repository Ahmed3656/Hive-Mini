using System.Web.Http;
using Trainees.Models.Interfaces.Base;
using Trainees.Models.Models;
using Trainees.Models.UnitOfWork;
using Unity;
using Unity.Injection;
using Unity.Lifetime;
using Unity.WebApi;
using DBConnectionStringHelper;

namespace MyWebApi
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();

            container.RegisterType<TraineeDB_DemoEntities>(new HierarchicalLifetimeManager(), new InjectionConstructor(DbConnection.GetTraineeDBConnectionString()));
            container.RegisterType<IUnitOfWork, UnitOfWork>(new HierarchicalLifetimeManager());

            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}