using System.Collections.Generic;
using System.Configuration;
using System.Linq;

namespace CommonLib.Helpers
{
    public static class ConfigName
    {
        public static string DBServerName = "HiveCFMTraineeDBServerName";
        public static string TraineeDBName = "HiveCFMTraineeDBName";
        public static string DBUserID = "HiveCFMDBUserID";
        public static string DBUserPassword = "HiveCFMDBUserPassword";
        public static string DBIntegrated = "HiveCFMDBIntegrated";
        public static string DBTrustServerCertificate = "HiveCFMDBConnectionTrustServerCertificate";
        public static string DBConnectionEncrypt = "HiveCFMDBConnectionEncrypt";
    }

    public static class ApiAppSettingsHelper
    {
        #region Fields
        private static string _dbServerName;
        public static string DBServerName
        {
            get { return _dbServerName; }
            private set { _dbServerName = value; }
        }

        private static string _traineeDBName;
        public static string TraineeDBName
        {
            get { return _traineeDBName; }
            private set { _traineeDBName = value; }
        }

        private static string _dbUserID;
        public static string DBUserID
        {
            get { return _dbUserID; }
            private set { _dbUserID = value; }
        }

        private static string _dbUserPassword;
        public static string DBUserPassword
        {
            get { return _dbUserPassword; }
            private set { _dbUserPassword = value; }
        }

        private static bool _dbIntegrated;
        public static bool DBIntegrated
        {
            get { return _dbIntegrated; }
            private set { _dbIntegrated = value; }
        }

        private static bool _dbTrustServerCertificate;
        public static bool DBTrustServerCertificate
        {
            get { return _dbTrustServerCertificate; }
            private set { _dbTrustServerCertificate = value; }
        }

        private static bool _dbConnectionEncrypt;
        public static bool DBConnectionEncrypt
        {
            get { return _dbConnectionEncrypt; }
            private set { _dbConnectionEncrypt = value; }
        }
        #endregion

        #region Constructor
        static ApiAppSettingsHelper()
        {
            DBServerName = ConfigurationManager.AppSettings.AllKeys.Contains(ConfigName.DBServerName) ?
                ConfigurationManager.AppSettings[ConfigName.DBServerName].ToString() : string.Empty;

            TraineeDBName = ConfigurationManager.AppSettings.AllKeys.Contains(ConfigName.TraineeDBName) ?
                ConfigurationManager.AppSettings[ConfigName.TraineeDBName].ToString() : string.Empty;

            DBUserID = ConfigurationManager.AppSettings.AllKeys.Contains(ConfigName.DBUserID) ?
                ConfigurationManager.AppSettings[ConfigName.DBUserID].ToString() : string.Empty;

            DBUserPassword = ConfigurationManager.AppSettings.AllKeys.Contains(ConfigName.DBUserPassword) ?
                ConfigurationManager.AppSettings[ConfigName.DBUserPassword].ToString() : string.Empty;

            DBIntegrated = ConfigurationManager.AppSettings.AllKeys.Contains(ConfigName.DBIntegrated) ?
                bool.Parse(ConfigurationManager.AppSettings[ConfigName.DBIntegrated].ToString().ToLower()) : true;

            DBTrustServerCertificate = ConfigurationManager.AppSettings.AllKeys.Contains(ConfigName.DBTrustServerCertificate) ?
                bool.Parse(ConfigurationManager.AppSettings[ConfigName.DBTrustServerCertificate].ToString().ToLower()) : false;

            DBConnectionEncrypt = ConfigurationManager.AppSettings.AllKeys.Contains(ConfigName.DBConnectionEncrypt) ?
                bool.Parse(ConfigurationManager.AppSettings[ConfigName.DBConnectionEncrypt].ToString().ToLower()) : false;
        }
        #endregion
    }
}