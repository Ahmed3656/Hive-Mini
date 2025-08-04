using AutoMapper;
using CommonLib.Helpers;
using Trainees.Models.Models;
using Trainees.Models.ModelsDTO;

namespace MyWebApi.MapperConfigs.Profiles
{
    public class TraineeDataProfile : Profile
    {
        public TraineeDataProfile()
        {
            CreateMap<CFMUser, CFMUserDTO>();
            CreateMap<CFMUserDTO, CFMUser>();
        }
    }
}