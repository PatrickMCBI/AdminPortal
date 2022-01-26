using System;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

using BusinessRef.Model.UserLogin;
using BusinessRef.Interfaces.Generics;
using model = BusinessRef.Model.UserLogin.UserLoginReturnDataModel;


namespace DataAccess.UserLogin
{
    public class UserLoginDataAccess : IPostDatabaseData<model>
    {
        private readonly UserLoginParamDataModel _loginParamDataModel;
        public UserLoginDataAccess(UserLoginParamDataModel loginParamDataModel)
        {
            _loginParamDataModel = loginParamDataModel;
        }
        public model PostDatabaseData()
        {
            string connString = ConfigurationManager.ConnectionStrings["ERP_DBCS"].ConnectionString;

            model loginReturn = new model();

            using (SqlConnection con = new SqlConnection(connString))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = con;
                    cmd.CommandText = "[hrms.user].[spUserLoginData]";
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@UserName", SqlDbType = SqlDbType.VarChar, Size = 50, Value = _loginParamDataModel.UserName });

                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@IStillLoveYou", SqlDbType = SqlDbType.VarChar, Size = 8, Value = _loginParamDataModel.IStillLoveYou });
                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@ProgramModuleID", SqlDbType = SqlDbType.Int, Value = _loginParamDataModel.ProgramModuleID });

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.GetSchemaTable().Rows[0].ItemArray[0].ToString() == "ErrorMessage")
                        {
                            if (reader.HasRows)
                            {
                                reader.Read();

                                loginReturn.HasError = true;
                                loginReturn.ErrorMessage = reader["ErrorMessage"].ToString();
                            }

                        }
                        else
                        {
                            if (reader.HasRows)
                            {
                                reader.Read();

                                loginReturn.StatusCodeNumber = Convert.ToInt32(reader["StatusCodeNumber"]);
                                loginReturn.UserNameID = Convert.ToInt32(reader["UserNameID"]);
                                loginReturn.UserFirstName = reader["UserFirstName"].ToString();
                                loginReturn.UserLastName = reader["UserLastName"].ToString();

                            }

                        }
                    }

                }
            }

            return loginReturn;
        }
    }
}
