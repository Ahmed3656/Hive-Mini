using CommonLib.EnumExtensionMethods;
using CommonLib.Responses;
using CommonLib.ResultCodes;
using MapperHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Helpers;
using System.Web.Http;
using Trainees.Models.Interfaces.Base;
using Trainees.Models.Models;
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

        [HttpGet]
        [Route("API/User/GetById/{id}")]
        public IHttpActionResult GetById(int id)
        {
            try
            {
                CFMUser user = dataUnitOfWork.CFMUsers.Get(id);
                if (user != null)
                {
                    CFMUserDTO userDTO = user.MapTo<CFMUserDTO>();
                    return InterfaceJson(new ResponsePackage<CFMUserDTO> { Result = userDTO });
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

        [HttpPost]
        [Route("API/User/Create")]
        public IHttpActionResult Create([FromBody] CFMUserDTO userDTO)
        {
            try
            {
                if (userDTO == null)
                {
                    return InterfaceJson(new ResponsePackage<object>(
                    new Error
                    {
                        Code = ResultCode.NoItemsFound,
                        Message = "User data is required"
                    }));
                }

                var existingUser = dataUnitOfWork.CFMUsers.Find(u => u.Username == userDTO.Username).FirstOrDefault();
                if (existingUser != null)
                {
                    return InterfaceJson(new ResponsePackage<object>(
                    new Error
                    {
                        Code = ResultCode.DuplicateData,
                        Message = "Username already exists"
                    }));
                }

                var existingEmail = dataUnitOfWork.CFMUsers.Find(u => u.Email == userDTO.Email).FirstOrDefault();
                if (existingEmail != null)
                {
                    return InterfaceJson(new ResponsePackage<object>(
                    new Error
                    {
                        Code = ResultCode.DuplicateData,
                        Message = "Email already exists"
                    }));
                }

                CFMUser user = userDTO.MapTo<CFMUser>();
                user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
                dataUnitOfWork.CFMUsers.Add(user);
                dataUnitOfWork.Complete();

                CFMUserDTO createdUserDTO = user.MapTo<CFMUserDTO>();
                return InterfaceJson(new ResponsePackage<CFMUserDTO> { Result = createdUserDTO });
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

        [HttpPut]
        [Route("API/User/Update/{id}")]
        public IHttpActionResult Update(int id, [FromBody] CFMUserDTO userDTO)
        {
            try
            {
                if (userDTO == null)
                {
                    return InterfaceJson(new ResponsePackage<object>(
                    new Error
                    {
                        Code = ResultCode.NoItemsFound,
                        Message = "User data is required"
                    }));
                }

                CFMUser existingUser = dataUnitOfWork.CFMUsers.Get(id);
                if (existingUser == null)
                {
                    return InterfaceJson(new ResponsePackage<object>(
                    new Error
                    {
                        Code = ResultCode.NoItemsFound,
                        Message = "User not found"
                    }));
                }

                var duplicateUser = dataUnitOfWork.CFMUsers.Find(u => u.Username == userDTO.Username && u.ID != id).FirstOrDefault();
                if (duplicateUser != null)
                {
                    return InterfaceJson(new ResponsePackage<object>(
                    new Error
                    {
                        Code = ResultCode.DuplicateData,
                        Message = "Username already exists"
                    }));
                }

                var duplicateEmail = dataUnitOfWork.CFMUsers.Find(u => u.Email == userDTO.Email).FirstOrDefault();
                if (duplicateEmail != null)
                {
                    return InterfaceJson(new ResponsePackage<object>(
                    new Error
                    {
                        Code = ResultCode.DuplicateData,
                        Message = "Email already exists"
                    }));
                }

                CFMUser updatedUser = userDTO.MapTo<CFMUser>();
                updatedUser.ID = id;
                if (!string.IsNullOrEmpty(updatedUser.Password))
                {
                    updatedUser.Password = BCrypt.Net.BCrypt.HashPassword(updatedUser.Password);
                }
                else
                {
                    updatedUser.Password = existingUser.Password;
                }
                dataUnitOfWork.CFMUsers.Update(existingUser, updatedUser);
                dataUnitOfWork.Complete();

                CFMUserDTO updatedUserDTO = updatedUser.MapTo<CFMUserDTO>();
                return InterfaceJson(new ResponsePackage<CFMUserDTO> { Result = updatedUserDTO });
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

        /*[HttpDelete]
        [Route("API/User/SoftDelete/{id}")]
        public IHttpActionResult SoftDelete(int id)
        {
            try
            {
                CFMUser user = dataUnitOfWork.CFMUsers.Get(id);
                if (user == null)
                {
                    return InterfaceJson(new ResponsePackage<object>(
                    new Error
                    {
                        Code = ResultCode.NoItemsFound,
                        Message = "User not found"
                    }));
                }

                user.IsDeleted = true;
                dataUnitOfWork.Complete();

                return InterfaceJson(new ResponsePackage<string> { Result = "User soft deleted successfully" });
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
        }*/

        [HttpDelete]
        [Route("API/User/HardDelete/{id}")]
        public IHttpActionResult HardDelete(int id)
        {
            try
            {
                CFMUser user = dataUnitOfWork.CFMUsers.Get(id);
                if (user == null)
                {
                    return InterfaceJson(new ResponsePackage<object>(
                    new Error
                    {
                        Code = ResultCode.NoItemsFound,
                        Message = "User not found"
                    }));
                }

                dataUnitOfWork.CFMUsers.Delete(u => u.ID == id);
                dataUnitOfWork.Complete();

                return InterfaceJson(new ResponsePackage<string> { Result = "User deleted successfully" });
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

        [HttpPost]
        [Route("API/User/Login")]
        public IHttpActionResult Login([FromBody] LoginRequestDTO loginRequest)
        {
            try
            {
                if (loginRequest == null || string.IsNullOrEmpty(loginRequest.Username) || string.IsNullOrEmpty(loginRequest.Password))
                {
                    return InterfaceJson(new ResponsePackage<object>(
                    new Error
                    {
                        Code = ResultCode.NoItemsFound,
                        Message = "Username and password are required"
                    }));
                }

                CFMUser user = dataUnitOfWork.CFMUsers.Login(loginRequest.Username, loginRequest.Password);
                if (user != null)
                {
                    CFMUserDTO userDTO = user.MapTo<CFMUserDTO>();
                    return InterfaceJson(new ResponsePackage<CFMUserDTO> { Result = userDTO });
                }
                else
                {
                    return InterfaceJson(new ResponsePackage<object>(
                    new Error
                    {
                        Code = ResultCode.InvalidCredentials,
                        Message = "Invalid username or password"
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
    }
}
