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
    public partial class DeleteRequestDTO
    {
        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Id must be greater than 0.")]
        public int Id { get; set; }
    }
}
