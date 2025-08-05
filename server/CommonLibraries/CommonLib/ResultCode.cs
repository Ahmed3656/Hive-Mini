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

        [Description("Invalid input data.")]
        InvalidInputData = 4,

        [Description("Duplicate data found.")]
        DuplicateData = 5,

        [Description("User does not exist in the database. Please check the provided ID.")]
        UserNotExist = 6,

        [Description("Invalid Credentials.")]
        InvalidCredentials = 7,

        [Description("Survey does not exist in the database. Please check the provided ID.")]
        SurveyNotExist = 8,
    }
}