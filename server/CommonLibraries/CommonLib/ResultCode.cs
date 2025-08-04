using System.ComponentModel;

namespace CommonLib.ResultCodes
{
    public enum ResultCode
    {
        [Description("Success")]
        Success = 0,

        [Description("No items found.")]
        NoItemsFound = 1,

        [Description("API Post Failed.")]
        APIPostFailed = 2,

        [Description("An unexpected error occurred.")]
        UnExpectedError = 3,
    }
}