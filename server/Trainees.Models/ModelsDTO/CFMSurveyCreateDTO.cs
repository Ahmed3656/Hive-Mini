using AutoMapper.Configuration.Annotations;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Trainees.Models.Models;


namespace Trainees.Models.ModelsDTO
{
    public partial class CFMSurveyCreateDTO
    {
        public int ID { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Status { get; set; }
        [Required]
        public int CreatedBy { get; set; }
        [Required]
        public Nullable<System.DateTime> ModifiedAt { get; set; }
        [Required]
        public Nullable<int> ModifiedBy { get; set; }
        [Required]
        public string Type { get; set; }
        [Required]
        public string Language { get; set; }
        [Required]
        public Nullable<int> Responses { get; set; }
    }
}
