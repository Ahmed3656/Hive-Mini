using Trainees.Models.ModelsDTO;
using MapperHelper;

namespace Trainees.Models.Models
{
    public partial class CFMUser
    {
        public CFMUserDTO ToObject()
        {
            return this.MapTo<CFMUserDTO>();
        }
    }
}
