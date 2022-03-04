using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

using BusinessRef.Interfaces.Customs;
using BusinessRef.Interfaces.Generics;
using BusinessRef.Model.FundRequest;

using model = BusinessRef.Model.FundRequest.FundRequestReturnNewDataModel;

namespace DataAccess.FundRequest
{
    public class FundRequestNewDataAccess : IPostDatabaseData<model>
    {
        private readonly FundRequestParamNewDataModel _paramData;
        public FundRequestNewDataAccess(FundRequestParamNewDataModel paramData)
        {
            _paramData = paramData;
        }
        public model PostDatabaseData()
        {
            string connString = ConfigurationManager.ConnectionStrings["ERP_DBCS"].ConnectionString;

            model paramDataReturn = new model();

            using (SqlConnection con = new SqlConnection(connString))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = con;
                    cmd.CommandText = "[ams.accounting].[spFundRequestNewData]";
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@ProjectID", SqlDbType = SqlDbType.Int, Value = _paramData.ProjectID });
                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@FormDate", SqlDbType = SqlDbType.Date, Value = _paramData.FormDate });
                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@DocumentRefID_Doc", SqlDbType = SqlDbType.Int, Value = _paramData.DocumentRefID_Doc });
                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@Amount", SqlDbType = SqlDbType.Float, Value = _paramData.Amount });
                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@UserNameID", SqlDbType = SqlDbType.Int, Value = _paramData.UserNameID });


                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.GetSchemaTable().Rows[0].ItemArray[0].ToString() == "ErrorMessage")
                        {
                            if (reader.HasRows)
                            {
                                reader.Read();

                                paramDataReturn.HasError = true;
                                paramDataReturn.ErrorMessage = reader["ErrorMessage"].ToString();
                            }


                        }
                        else
                        {
                            if (reader.HasRows)
                            {
                                reader.Read();
                                paramDataReturn.StatusCodeNumber = Convert.ToInt32(reader["StatusCodeNumber"]);
                                paramDataReturn.DocumentRefID = reader["DocumentRefID"] as int? ?? default;
                                paramDataReturn.FundRequestDetailID = reader["FundRequestDetailID"] as int? ?? default;
                                paramDataReturn.ReferenceNo = reader["ReferenceNo"].ToString();
                               
                               
                            }

                        }
                    }

                }
            }

            return paramDataReturn;
        }
    }
}
