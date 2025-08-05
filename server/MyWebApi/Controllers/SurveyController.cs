using CommonLib.EnumExtensionMethods;
using CommonLib.Responses;
using CommonLib.ResultCodes;
using MapperHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Trainees.Models.Interfaces.Base;
using Trainees.Models.Models;
using Trainees.Models.ModelsDTO;

namespace MyWebApi.Controllers
{
    public class SurveyController : HiveAPIBaseController
    {
        public SurveyController(IUnitOfWork _dataUnitOfWork)
           : base(_dataUnitOfWork)
        {
        }

        [HttpGet]
        [Route("API/Survey/GetAll")]
        public IHttpActionResult GetAll()
        {
            try
            {
                List<CFMSurvey> surveys = dataUnitOfWork.CFMSurveys.GetWithUsers();
                List<CFMSurveyReadDTO> surveyDTOs = surveys.MapTo<List<CFMSurveyReadDTO>>();

                if (surveyDTOs.Count > 0)
                {
                    return InterfaceJson(new ResponsePackage<List<CFMSurveyReadDTO>> { Result = surveyDTOs });
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
        [Route("API/Survey/GetById")]
        public IHttpActionResult GetById(int Id)
        {
            try
            {
                CFMSurvey survey = dataUnitOfWork.CFMSurveys.Get(Id);
                CFMSurveyReadDTO surveyDTO = survey.MapTo<CFMSurveyReadDTO>();

                if (surveyDTO != null)
                {
                    return InterfaceJson(new ResponsePackage<CFMSurveyReadDTO> { Result = surveyDTO });
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

        /// <summary>
        /// Add new End Point here retrive survey by where user id is the owner of the survey.
        /// </summary>

        [HttpPost]
        [Route("API/Survey/Add")]
        public IHttpActionResult Add([FromBody] CFMSurveyCreateDTO surveyDTO)
        {
            try
            {
                if (surveyDTO == null || !ModelState.IsValid)
                {
                    var errors = ModelState.Values
                                   .SelectMany(v => v.Errors)
                                   .Select(e => e.ErrorMessage ?? e.Exception?.Message)
                                   .ToList();

                    return InterfaceJson(new ResponsePackage<object>(
                    new Error
                    {
                        Code = ResultCode.InvalidInputData,
                        Message = string.Join("; ", errors)
                    }));
                }
                CFMSurvey survey = surveyDTO.MapTo<CFMSurvey>();
                dataUnitOfWork.CFMSurveys.Add(survey);
                dataUnitOfWork.Complete();

                return InterfaceJson(new ResponsePackage<CFMSurveyCreateDTO> { Result = survey.MapTo<CFMSurveyCreateDTO>() });
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
        [Route("API/Survey/Update")]
        public IHttpActionResult Update([FromBody] CFMSurveyCreateDTO surveyDTO)
        {
            try
            {
                if (surveyDTO == null || !ModelState.IsValid)
                {
                    var errors = ModelState.Values
                                   .SelectMany(v => v.Errors)
                                   .Select(e => e.ErrorMessage ?? e.Exception?.Message)
                                   .ToList();
                    return InterfaceJson(new ResponsePackage<object>(
                    new Error
                    {
                        Code = ResultCode.InvalidInputData,
                        Message = string.Join("; ", errors)
                    }));
                }
                else if (surveyDTO.ID <= 0)
                {
                    return InterfaceJson(new ResponsePackage<object>(
                    new Error
                    {
                        Code = ResultCode.InvalidInputData,
                        Message = "Survey ID must be greater than zero."
                    }));
                }
                else
                {
                    CFMSurvey existingSurvey = dataUnitOfWork.CFMSurveys.Get(surveyDTO.ID);
                    if (existingSurvey == null)
                    {
                        return InterfaceJson(new ResponsePackage<object>(
                        new Error
                        {
                            Code = ResultCode.SurveyNotExist,
                            Message = ResultCode.SurveyNotExist.GetDescription()
                        }));
                    }

                    dataUnitOfWork.CFMSurveys.Update(existingSurvey, surveyDTO.MapTo<CFMSurvey>());
                    dataUnitOfWork.Complete();
                    return InterfaceJson(new ResponsePackage<CFMSurveyCreateDTO> { Result = existingSurvey.MapTo<CFMSurveyCreateDTO>() });
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
        [Route("API/Survey/Delete")]
        public IHttpActionResult Delete([FromBody] DeleteRequestDTO deleteRequestDTO)
        {
            try
            {
                if (deleteRequestDTO == null || !ModelState.IsValid)
                {
                    var errors = ModelState.Values
                                   .SelectMany(v => v.Errors)
                                   .Select(e => e.ErrorMessage ?? e.Exception?.Message)
                                   .ToList();
                    return InterfaceJson(new ResponsePackage<object>(
                    new Error
                    {
                        Code = ResultCode.InvalidInputData,
                        Message = string.Join("; ", errors)
                    }));
                }
                else
                {
                    CFMSurvey survey = dataUnitOfWork.CFMSurveys.Get(deleteRequestDTO.Id);
                    if (survey == null)
                    {
                        return InterfaceJson(new ResponsePackage<object>(
                        new Error
                        {
                            Code = ResultCode.NoItemsFound,
                            Message = ResultCode.NoItemsFound.GetDescription()
                        }));
                    }
                    dataUnitOfWork.CFMSurveys.Delete(s => s.ID == deleteRequestDTO.Id);
                    dataUnitOfWork.Complete();
                    return InterfaceJson(new ResponsePackage<object> { Result = null });
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
        [Route("API/Survey/GetByOwner")]
        public IHttpActionResult GetByOwner(int userId)
        {
            try
            {
                if (userId <= 0)
                {
                    return InterfaceJson(new ResponsePackage<object>(
                        new Error
                        {
                            Code = ResultCode.InvalidInputData,
                            Message = "Invalid user ID provided."
                        }));
                }

                List<CFMSurvey> surveys = dataUnitOfWork.CFMSurveys.GetSurveysByOwner(userId);
                List<CFMSurveyReadDTO> surveyDTOs = surveys.MapTo<List<CFMSurveyReadDTO>>();

                if (surveyDTOs.Count > 0)
                {
                    return InterfaceJson(new ResponsePackage<List<CFMSurveyReadDTO>> { Result = surveyDTOs });
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
    }
}
