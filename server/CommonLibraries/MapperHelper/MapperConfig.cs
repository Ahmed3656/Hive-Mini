using AutoMapper;

namespace MapperHelper
{
    /// <summary>
    /// Main configuration file for mapping objects from/to DTo
    /// </summary>
    public static class MapperConfig
    {
        ///// <summary>
        ///// Current Mapper instance
        ///// </summary>
        public static IMapper Mapper;

        /// <summary>
        /// Configure mapping
        /// </summary>
        public static void Configure(MapperConfiguration config)
        {
            Mapper = config.CreateMapper();
        }
    }
}