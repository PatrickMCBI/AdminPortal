using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

using BusinessRef.Interfaces.Customs;
using BusinessRef.Interfaces.Generics;
using BusinessRef.Model.FundRequest;

using model = BusinessRef.Model.FundRequest.FundRequestReturnSendToAccountingDataModel;

namespace DataAccess.FundRequest
{
    public class FundRequestSendToAccountingDataAccess : IPostDatabaseData<model>
    {
        private readonly FundRequestParamSendToAccountingDataModel _paramData;
        public FundRequestSendToAccountingDataAccess(FundRequestParamSendToAccountingDataModel paramData)
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
                    cmd.CommandText = "[ams.accounting].[spFundRequestSendToAccounting_Review]";
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@DocumentRefID", SqlDbType = SqlDbType.Int, Value = _paramData.DocumentRefID });
                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@Note", SqlDbType = SqlDbType.VarChar, Size = -1, Value = _paramData.Note });
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

                            }

                        }
                    }

                }
            }

            return paramDataReturn;
        }
    }
}
