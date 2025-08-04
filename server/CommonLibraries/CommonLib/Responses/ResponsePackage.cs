using CommonLib.EnumExtensionMethods;
using CommonLib.ResultCodes;

namespace CommonLib.Responses
{
    public class Error
    {
        public ResultCode Code { get; set; }
        public string Message { get; set; }
       
        public Error(ResultCode code, string message)
        {
            Code = code;
            Message = message;
        }

        public Error(ResultCode code)
        {
            Code = code;
            Message = code.GetDescription();
        }

        public Error(string message)
        {
            Message = message;
            Code = ResultCode.UnExpectedError;
        }

        public Error()
        {
            Code = ResultCode.UnExpectedError;
            Message = Code.GetDescription();
        }
    }


    public class ResponsePackage
    {
        public bool IsSuccessful => Error == null || Error.Code == ResultCode.Success;
        public Error Error { get; set; }
    }

    public class ResponsePackage<T> : ResponsePackage
    {
        public T Result { get; set; }
      

        public ResponsePackage()
        {
            Error = null;
        }

        public ResponsePackage(T result, Error error)
        {
            Error = error;
            Result = result;
        }

        public ResponsePackage(Error error)
        {
            Error = error;
        }

        public ResponsePackage(T result)
        {
            Error = null;
            Result = result;
        }
    }
}
