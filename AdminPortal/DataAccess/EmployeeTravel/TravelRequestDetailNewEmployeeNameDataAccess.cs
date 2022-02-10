using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

using BusinessRef.Interfaces.Generics;
using BusinessRef.Model.EmployeeTravel;
using model = BusinessRef.Model.EmployeeTravel.TravelRequestDetailReturnEmployeeNameNewDataModel;


namespace DataAccess.EmployeeTravel
{
    public class TravelRequestDetailNewEmployeeNameDataAccess : IPostDatabaseData<model>
    {
        private readonly TravelRequestDetailParamEmployeeNameNewDataModel _detailParamNewDataModel;

        public TravelRequestDetailNewEmployeeNameDataAccess(TravelRequestDetailParamEmployeeNameNewDataModel detailParamNewDataModel)
        {
            _detailParamNewDataModel = detailParamNewDataModel;
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
                    cmd.CommandText = "[adms.travel].[spTravelRequestEmployeeDetailNewData]";
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@DocumentRefID", SqlDbType = SqlDbType.Int, Value = _detailParamNewDataModel.DocumentRefID });
                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@EmployeeID", SqlDbType = SqlDbType.Int, Value = _detailParamNewDataModel.EmployeeID });
                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@BaggageWeight", SqlDbType = SqlDbType.Float, Value = _detailParamNewDataModel.BaggageWeight });
                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@UserNameID", SqlDbType = SqlDbType.Int, Value = _detailParamNewDataModel.UserNameID });

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
                                masterDataReturn.EmployeeDetailID = Convert.ToInt32(reader["EmployeeDetailID"]);
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
