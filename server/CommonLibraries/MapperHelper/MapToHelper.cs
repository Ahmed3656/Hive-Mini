namespace MapperHelper
{
    public static class MapToHelper
    {
        /// <summary>
        /// Maps object to dest object.
        /// </summary>
        /// <typeparam name="TDest"></typeparam>
        /// <param name="src">Object to map</param>
        /// <returns>Mapped object</returns>
        public static TDest MapTo<TDest>(this object src)
        {
            return (TDest)MapperConfig.Mapper.Map(src, src.GetType(), typeof(TDest));
        }
    }
}
