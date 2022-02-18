using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

using BusinessRef.Interfaces.Generics;
using BusinessRef.Model.EmployeeTravel;

using model = BusinessRef.Model.EmployeeTravel.TravelRequestDetailReturnAccomodationDeleteDataModel;

namespace DataAccess.EmployeeTravel
{
    public class TravelRequestDetailAccomodationDeleteDataAccess : IPostDatabaseData<model>
    {
        private readonly TravelRequestDetailParamAccomodationDeleteDataModel _dataModel;
        public TravelRequestDetailAccomodationDeleteDataAccess(TravelRequestDetailParamAccomodationDeleteDataModel dataModel)
        {
            _dataModel = dataModel;
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
                    cmd.CommandText = "[adms.travel].[spTravelRequestAccomodationDetailDeleteData_Sender]";
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@AccomodationDetailID", SqlDbType = SqlDbType.Int, Value = _dataModel.AccomodationDetailID });

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
