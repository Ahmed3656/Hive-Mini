using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Trainees.Models.Models
{
    public partial class TraineeDB_DemoEntities : DbContext
    {
        public TraineeDB_DemoEntities(string connectionString)
        : base(connectionString)
        {
            Configuration.AutoDetectChangesEnabled = false;
        }
    }
}
