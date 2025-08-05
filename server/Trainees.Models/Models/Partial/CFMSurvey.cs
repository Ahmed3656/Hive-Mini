using Trainees.Models.ModelsDTO;
using MapperHelper;

namespace Trainees.Models.Models
{
    public partial class CFMSurvey
    {
        public CFMSurveyCreateDTO ToObject()
        {
            return this.MapTo<CFMSurveyCreateDTO>();
        }

        public CFMUser CreatedByUser => this.CFMUser;
        public CFMUser ModifiedByUser => this.CFMUser1;
    }
}
