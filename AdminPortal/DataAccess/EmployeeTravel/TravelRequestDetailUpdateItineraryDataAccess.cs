using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

using BusinessRef.Interfaces.Generics;
using BusinessRef.Model.EmployeeTravel;
using model = BusinessRef.Model.References.StatusCodeNumberReturnRefDataModel;

namespace DataAccess.EmployeeTravel
{
    public class TravelRequestDetailUpdateItineraryDataAccess : IPostDatabaseData<model>
    {
        private readonly TravelRequestDetailParamIteneraryUpdateDataModel _detailParamUpdateDataModel;

        public TravelRequestDetailUpdateItineraryDataAccess(TravelRequestDetailParamIteneraryUpdateDataModel detailParamUpdateDataModel)
        {
            _detailParamUpdateDataModel = detailParamUpdateDataModel;
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
                    cmd.CommandText = "[adms.travel].[spTravelRequestIteneraryDetailUpdateData_Sender]";
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@IteneraryDetailID", SqlDbType = SqlDbType.Int, Value = _detailParamUpdateDataModel.IteneraryDetailID });
                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@DocumentRefID", SqlDbType = SqlDbType.Int, Value = _detailParamUpdateDataModel.DocumentRefID });
                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@From", SqlDbType = SqlDbType.VarChar, Value = _detailParamUpdateDataModel.From, Size = 500 });
                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@To", SqlDbType = SqlDbType.VarChar, Value = _detailParamUpdateDataModel.To, Size = 500 });
                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@TransportModeID", SqlDbType = SqlDbType.Int, Value = _detailParamUpdateDataModel.TransportModeID });
                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@Fare", SqlDbType = SqlDbType.Float, Value = _detailParamUpdateDataModel.Fare });
                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@UserNameID", SqlDbType = SqlDbType.Int, Value = _detailParamUpdateDataModel.UserNameID });

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
