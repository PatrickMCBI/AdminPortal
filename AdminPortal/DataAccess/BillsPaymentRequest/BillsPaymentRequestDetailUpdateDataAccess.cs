using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

using BusinessRef.Interfaces.Generics;
using BusinessRef.Model.BillingPaymentRequest;

using model = BusinessRef.Model.BillingPaymentRequest.BillsPaymentRequestReturnUpdateDetailDataModel;
namespace DataAccess.BillsPaymentRequest
{
    public class BillsPaymentRequestDetailUpdateDataAccess : IPostDatabaseData<model>
    {
        private readonly BillsPaymentRequestParamUpdateDetailDataModel _paramData;

        public BillsPaymentRequestDetailUpdateDataAccess(BillsPaymentRequestParamUpdateDetailDataModel paramData)
        {
            _paramData = paramData;
        }
        public model PostDatabaseData()
        {
            string connString = ConfigurationManager.ConnectionStrings["ERP_DBCS"].ConnectionString;

            model dataReturn = new model();

            using (SqlConnection con = new SqlConnection(connString))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = con;
                    cmd.CommandText = "[adms.bills].[spBillsPaymentRequestDetailUpdateData_Admin]";
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@BillsPaymentRequestDetailID", SqlDbType = SqlDbType.Int, Value = _paramData.BillsPaymentRequestDetailID });
                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@DocumentRefID", SqlDbType = SqlDbType.Int, Value = _paramData.DocumentRefID });
                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@BillsPaymentTypeID", SqlDbType = SqlDbType.Int, Value = _paramData.BillsPaymentTypeID });
                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@Amount", SqlDbType = SqlDbType.Float, Value = _paramData.Amount });
                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@UserNameID", SqlDbType = SqlDbType.Int, Value = _paramData.UserNameID });
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.GetSchemaTable().Rows[0].ItemArray[0].ToString() == "ErrorMessage")
                        {
                            if (reader.HasRows)
                            {
                                reader.Read();

                                dataReturn.HasError = true;
                                dataReturn.ErrorMessage = reader["ErrorMessage"].ToString();
                            }


                        }
                        else
                        {
                            if (reader.HasRows)
                            {
                                reader.Read();

                                dataReturn.StatusCodeNumber = Convert.ToInt32(reader["StatusCodeNumber"]);

                            }

                        }
                    }

                }
            }

            return dataReturn;
        }
    }
}