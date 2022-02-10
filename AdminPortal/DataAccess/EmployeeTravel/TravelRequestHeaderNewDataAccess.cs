using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

using BusinessRef.Interfaces.Generics;
using BusinessRef.Model.EmployeeTravel;
using model = BusinessRef.Model.EmployeeTravel.TravelRequestHeaderReturnNewDataModel;

namespace DataAccess.EmployeeTravel
{
    public class TravelRequestHeaderNewDataAccess : IPostDatabaseData<model>
    {
        private readonly TravelRequestHeaderParamNewDataModel _mastParamNewDataModel;

        public TravelRequestHeaderNewDataAccess(TravelRequestHeaderParamNewDataModel mastParamNewDataModel)
        {
            _mastParamNewDataModel = mastParamNewDataModel;
        }
        public model PostDatabaseData()
        {
            string connString = ConfigurationManager.ConnectionStrings["ERP_DBCS"].ConnectionString;

            model masterDataReturn = new model();

            using (SqlConnection con = new SqlConnection(connString))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = con;
                    cmd.CommandText = "[adms.travel].[spTravelRequestNewData]";
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@ProjectIDOrigin", SqlDbType = SqlDbType.Int, Value = _mastParamNewDataModel.ProjectIDOrigin });
                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@ProjectIDDestination", SqlDbType = SqlDbType.Int, Value = _mastParamNewDataModel.ProjectIDDestination });
                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@FormDate", SqlDbType = SqlDbType.Date, Value = _mastParamNewDataModel.FormDate });
                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@TravelDate", SqlDbType = SqlDbType.Date, Value = _mastParamNewDataModel.TravelDate });
                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@TravelPurpose", SqlDbType = SqlDbType.VarChar, Size=500, Value = _mastParamNewDataModel.TravelPurpose });
                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@UserNameID", SqlDbType = SqlDbType.Int, Value = _mastParamNewDataModel.UserNameID });

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.GetSchemaTable().Rows[0].ItemArray[0].ToString() == "ErrorMessage")
                        {
                            if (reader.HasRows)
                            {
                                reader.Read();

                                masterDataReturn.HasError = true;
                                masterDataReturn.ErrorMessage = reader["ErrorMessage"].ToString();
                            }


                        }
                        else
                        {
                            if (reader.HasRows)
                            {
                                reader.Read();
                                masterDataReturn.DocumentRefID = Convert.ToInt32(reader["DocumentRefID"]);
                                masterDataReturn.ReferenceNo = reader["ReferenceNo"].ToString();
                                masterDataReturn.StatusCodeNumber = Convert.ToInt32(reader["StatusCodeNumber"]);
                               

                            }

                        }
                    }

                }
            }

            return masterDataReturn;
        }
    }
}
