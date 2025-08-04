using AutoMapper;
using MyWebApi.MapperConfigs.Profiles;
using MapperHelper;

namespace MyWebApi.MapperConfigs
{
    /// <summary>
    /// Main configuration file for mapping objects from/to DTo
    /// </summary>
    public static class MapperConfigure
    {
        /// <summary>
        /// Configure mapping
        /// </summary>
        public static void Configure()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<TraineeDataProfile>();
            });

            MapperConfig.Configure(config);
        }
    }
}