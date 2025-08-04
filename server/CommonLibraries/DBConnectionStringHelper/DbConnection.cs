using System;
using System.Data.Entity.Core.EntityClient;
using System.Data.SqlClient;
using CommonLib.Helpers;

namespace DBConnectionStringHelper
{
    public class DbConnectionParams
    {
        public string ServerName { get; set; }
        public string DatabaseName { get; set; }
        public string EdmxFileName { get; set; }
        public string UserID { get; set; }
        public string UserPassword { get; set; }
        public bool IntegratedSecurity { get; set; }
        public bool TrustServerCertificate { get; set; }
        public bool ConnectionEncrypt { get; set; }
    }

    public static class DbConnection
    {
        /// <summary>
        /// GetDBConnectionString returns the connection string to be used in the ctor of DbContext class in entity framework
        /// </summary>
        /// <param name="serverName"> database server name, DataSource </param>
        /// <param name="databaseName"> database name </param>
        /// <param name="edmxFileName"> edmx file name without extention (.edmx) in formate ( folderName.edmxFIleName ) </param>
        /// <returns> database connection string </returns>
        public static string GetDBConnectionString(string serverName, string databaseName, string edmxFileName)
        {
            string configDBUserID = ApiAppSettingsHelper.DBUserID;
            string configDBUserPass = ApiAppSettingsHelper.DBUserPassword;
            bool configIntegratedSecurity = ApiAppSettingsHelper.DBIntegrated;
            bool configDBTrustServerCertificate = ApiAppSettingsHelper.DBTrustServerCertificate;
            bool configDBConnectionEncrypt = ApiAppSettingsHelper.DBConnectionEncrypt;
            return GetConnectionString(new DbConnectionParams()
            {
                ServerName = serverName,
                DatabaseName = databaseName,
                EdmxFileName = edmxFileName,
                UserID = configDBUserID,
                UserPassword = configDBUserPass,
                IntegratedSecurity = configIntegratedSecurity,
                TrustServerCertificate = configDBTrustServerCertificate,
                ConnectionEncrypt = configDBConnectionEncrypt
            });
        }

        public static string GetConnectionString(DbConnectionParams dbConnectionParams)
        {
            SqlConnectionStringBuilder providerCs = new SqlConnectionStringBuilder();

            providerCs.DataSource = dbConnectionParams.ServerName;
            providerCs.InitialCatalog = dbConnectionParams.DatabaseName;
            providerCs.IntegratedSecurity = dbConnectionParams.IntegratedSecurity;
            providerCs.TrustServerCertificate = dbConnectionParams.TrustServerCertificate;
            providerCs.Encrypt = dbConnectionParams.ConnectionEncrypt;

            if (!dbConnectionParams.IntegratedSecurity)
            {
                providerCs.UserID = dbConnectionParams.UserID;
                providerCs.Password = dbConnectionParams.UserPassword;
            }

            var edmxFileName = dbConnectionParams.EdmxFileName;
            var csBuilder = new EntityConnectionStringBuilder();

            csBuilder.Provider = "System.Data.SqlClient";
            csBuilder.ProviderConnectionString = providerCs.ToString();
            csBuilder.Metadata = "res://*/" + edmxFileName + ".csdl|res://*/" + edmxFileName + ".ssdl|res://*/" + edmxFileName + ".msl";

            return csBuilder.ToString();
        }

        public static string GetTraineeDBConnectionString()
        {
            string serverName = ApiAppSettingsHelper.DBServerName;
            string databaseName = ApiAppSettingsHelper.TraineeDBName;

            return GetDBConnectionString(serverName, databaseName, "Models.TraineeDB");
        }

        public static string GetTraineeDBSqlConnectionString()
        {
            // Make sure the connection string has a value:
            string sqlConnectionString = GetTraineeDBConnectionString();
            if (string.IsNullOrEmpty(sqlConnectionString)) return string.Empty;

            // Turn an Entity Framework connection string into a SQL connection string:
            if (sqlConnectionString.StartsWith("metadata", StringComparison.OrdinalIgnoreCase))
            {
                var efBuilder = new EntityConnectionStringBuilder(sqlConnectionString);
                sqlConnectionString = efBuilder.ProviderConnectionString;
            }

            return sqlConnectionString;
        }
    }
}
