using Trainees.Models.Interfaces.Base;
using Trainees.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using CommonLib.Responses;
using CommonLib.ResultCodes;
using CommonLib.EnumExtensionMethods;
using MapperHelper;
using Trainees.Models.ModelsDTO;

namespace MyWebApi.Controllers
{
    public class UserController : HiveAPIBaseController
    {
        public UserController(IUnitOfWork _dataUnitOfWork)
           : base(_dataUnitOfWork)
        {
        }

        [HttpGet]
        [Route("API/User/GetAll")]
        public IHttpActionResult GetAll()
        {
            try
            {
                List<CFMUser> users = dataUnitOfWork.CFMUsers.GetAll().ToList();
                List<CFMUserDTO> usersDTO = users.MapTo<List<CFMUserDTO>>();

                if (usersDTO.Count > 0)
                {
                    return InterfaceJson(new ResponsePackage<List<CFMUserDTO>> { Result = usersDTO });
                }
                else
                {
                    return InterfaceJson(new ResponsePackage<object>(
                    new Error
                    {
                        Code = ResultCode.NoItemsFound,
                        Message = ResultCode.NoItemsFound.GetDescription()
                    }));
                }
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex.Message);
                return InterfaceJson(new ResponsePackage<object>(
                new Error()
                {
                    Code = ResultCode.APIPostFailed,
                    Message = ResultCode.APIPostFailed.GetDescription()
                }));
            }
        }

        // soft del, hard del, insert, update, login
    }
}
