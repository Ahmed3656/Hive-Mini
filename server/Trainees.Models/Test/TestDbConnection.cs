using Trainees.Models.Models;
using System;
using System.Data.SqlClient;

namespace Trainees.Models.Test
{
    public static class TestDbConnection
    {
        public static bool TestDatabase(string connectionStr)
        {
            try
            {
                using (var context = new TraineeDB_DemoEntities(connectionStr))
                {
                    context.Database.Connection.Open();
                    var users = context.CFMUsers.Find(1);
                    context.Database.Connection.Close();
                    return true;
                }
            }
            catch (SqlException ex)
            {
                throw new Exception("Database connection failed. Please check the connection string.", ex);
            }
            catch (Exception ex)
            {
                return false;
            }
        }


    }
}
