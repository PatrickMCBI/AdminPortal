using System;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Collections.Generic;

using BusinessRef.Model.References;
using BusinessRef.Model.BillingPaymentRequest;
using BusinessRef.Interfaces.Generics;
using model = BusinessRef.Model.BillingPaymentRequest.BillsPaymentRequestReturnRecordReference;

namespace DataAccess.BillsPaymentRequest
{
    public class BillsPaymentRequestReferenceRecordDataAccess : IGetDatabaseData<model>
    {
        private readonly BillsPaymentRequestParamRecordReference _paramData;
        public BillsPaymentRequestReferenceRecordDataAccess(BillsPaymentRequestParamRecordReference paramData)
        {
            _paramData = paramData;
        }
        public model GetDatabaseData()
        {
            string connString = ConfigurationManager.ConnectionStrings["ERP_DBCS"].ConnectionString;

            model getDataReturn = new model();

            using (SqlConnection con = new SqlConnection(connString))
            {
                con.Open();

                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = con;
                    cmd.CommandText = "[adms.travel].[spGetBillPaymentRequestMasterRecordReference_Admin]";
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@UserNameID", SqlDbType = SqlDbType.Int, Value = _paramData.UserNameID });

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.GetSchemaTable().Rows[0].ItemArray[0].ToString() == "ErrorMessage")
                        {
                            if (reader.HasRows)
                            {
                                reader.Read();

                                getDataReturn.HasError = true;
                                getDataReturn.ErrorMessage = reader["ErrorMessage"].ToString();
                            }

                        }
                        else
                        {
                            if (reader.HasRows)
                            {

                                getDataReturn.ProjectName = new List<TravelRequestProjectNameRefDataModel>();

                                while (reader.Read())
                                {
                                    getDataReturn.ProjectName.Add(new TravelRequestProjectNameRefDataModel
                                    {
                                        ProjectID = Convert.ToInt32(reader["ProjectID"]),
                                        ProjectName = reader["ProjectName"].ToString(),


                                    });
                                }

                                reader.NextResult();

                                getDataReturn.BillsList = new List<BillsPaymentRequestHeaderRefDataModel>();

                                while (reader.Read())
                                {
                                    getDataReturn.BillsList.Add(new BillsPaymentRequestHeaderRefDataModel
                                    {
                                        DocumentRefID = Convert.ToInt32(reader["DocumentRefID"]),
                                        ReferenceNo = reader["ReferenceNo"].ToString(),
                                        FormDate = reader["FormDate"] as DateTime? ?? default,
                                        ProjectID = Convert.ToInt32(reader["ProjectID"]),
                                        ProjectName = reader["ProjectName"].ToString(),
                                        ApproverStatusID = reader["ApproverStatusID"] as int? ?? default,
                                        ApproverStatus = reader["ApproverStatus"].ToString(),
                                        LocationStatusID = reader["LocationStatusID"] as int? ?? default,
                                        LocationStatus = reader["LocationStatus"].ToString(),
                                        IsRead = reader["IsRead"] as bool? ?? default,
                                        ApprovalStatusDate = reader["ApprovalStatusDate"] as DateTime? ?? default,
                                    });
                                }

                                reader.NextResult();
                                reader.Read();
                                getDataReturn.StatusCodeNumber = Convert.ToInt32(reader["StatusCodeNumber"]);

                            }

                        }
                    }
                }
            }

            return getDataReturn;
        }
    }
}
