using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

using BusinessRef.Interfaces.Generics;
using BusinessRef.Model.EmployeeTravel;
using model = BusinessRef.Model.References.StatusCodeNumberReturnRefDataModel;

namespace DataAccess.EmployeeTravel
{
    public class TravelRequestDetailUpdateEmployeeNameDataAccess : IPostDatabaseData<model>
    {
        private readonly TravelRequestDetailParamEmployeeNameUpdateDataModel _detailParamUpdateDataModel;

        public TravelRequestDetailUpdateEmployeeNameDataAccess(TravelRequestDetailParamEmployeeNameUpdateDataModel detailParamUpdateDataModel)
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
                    cmd.CommandText = "[adms.travel].[spTravelRequestEmployeeDetailUpdateData]";
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@EmployeeDetailID", SqlDbType = SqlDbType.Int, Value = _detailParamUpdateDataModel.EmployeeDetailID });
                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@DocumentRefID", SqlDbType = SqlDbType.Int, Value = _detailParamUpdateDataModel.DocumentRefID });
                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@EmployeeID", SqlDbType = SqlDbType.Int, Value = _detailParamUpdateDataModel.EmployeeID });
                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@BaggageWeight", SqlDbType = SqlDbType.Date, Value = _detailParamUpdateDataModel.BaggageWeight });
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
