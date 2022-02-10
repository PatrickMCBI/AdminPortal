using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

using BusinessRef.Interfaces.Generics;
using BusinessRef.Model.EmployeeTravel;
using model = BusinessRef.Model.EmployeeTravel.TravelRequestDetailReturnItineraryNewDataModel;

namespace DataAccess.EmployeeTravel
{
    public class TravelRequestDetailNewItineraryDataAccess : IPostDatabaseData<model>
    {
        private readonly TravelRequestDetailParamItineraryNewDataModel _detailParamNewDataModel;

        public TravelRequestDetailNewItineraryDataAccess(TravelRequestDetailParamItineraryNewDataModel detailParamNewDataModel)
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
                    cmd.CommandText = "[adms.travel].[spTravelRequestIteneraryDetailNewData]";
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@DocumentRefID", SqlDbType = SqlDbType.Int, Value = _detailParamNewDataModel.DocumentRefID });
                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@From", SqlDbType = SqlDbType.VarChar, Size=500, Value = _detailParamNewDataModel.From });
                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@To", SqlDbType = SqlDbType.VarChar, Size=200, Value = _detailParamNewDataModel.To });
                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@TransportModeID", SqlDbType = SqlDbType.Int, Value = _detailParamNewDataModel.TransportModeID });
                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@Fare", SqlDbType = SqlDbType.Float, Value = _detailParamNewDataModel.Fare });
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
                                masterDataReturn.IteneraryDetailID = Convert.ToInt32(reader["IteneraryDetailID"]);
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
