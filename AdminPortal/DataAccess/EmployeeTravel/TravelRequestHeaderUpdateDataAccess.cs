using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

using BusinessRef.Interfaces.Generics;
using BusinessRef.Model.EmployeeTravel;
using model = BusinessRef.Model.References.StatusCodeNumberReturnRefDataModel;

namespace DataAccess.EmployeeTravel
{
    public class TravelRequestHeaderUpdateDataAccess : IPostDatabaseData<model>
    {
        private readonly TravelRequestHeaderParamUpdateDataModel _mastParamUpdateDataModel;

        public TravelRequestHeaderUpdateDataAccess(TravelRequestHeaderParamUpdateDataModel mastParamUpdateDataModel)
        {
            _mastParamUpdateDataModel = mastParamUpdateDataModel;
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
                    cmd.CommandText = "[adms.travel].[spTravelRequestUpdateData]";
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@DocumentRefID", SqlDbType = SqlDbType.Int, Value = _mastParamUpdateDataModel.DocumentRefID });
                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@ProjectIDOrigin", SqlDbType = SqlDbType.Int, Value = _mastParamUpdateDataModel.ProjectIDOrigin });
                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@ProjectIDDestination", SqlDbType = SqlDbType.Int, Value = _mastParamUpdateDataModel.ProjectIDDestination });
                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@FormDate", SqlDbType = SqlDbType.Date, Value = _mastParamUpdateDataModel.FormDate });
                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@TravelDate", SqlDbType = SqlDbType.Date, Value = _mastParamUpdateDataModel.TravelDate });
                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@TravelPurpose", SqlDbType = SqlDbType.VarChar, Size = 500, Value = _mastParamUpdateDataModel.TravelPurpose });
                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@UserNameID", SqlDbType = SqlDbType.Int, Value = _mastParamUpdateDataModel.UserNameID });
                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@ReturnDate", SqlDbType = SqlDbType.Date, Value = _mastParamUpdateDataModel.ReturnDate });


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
