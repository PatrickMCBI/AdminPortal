using System;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Collections.Generic;

using BusinessRef.Model.References;
using BusinessRef.Model.BillingPaymentRequest;
using BusinessRef.Interfaces.Generics;
using model = BusinessRef.Model.BillingPaymentRequest.BillsPaymentRequestReturnIndividualRecord;

namespace DataAccess.BillsPaymentRequest
{
    public class BillsPaymentRequestIndividualRecordDataAccess : IGetDatabaseData<model>
    {
        private readonly BillsPaymentRequestParamIndividualRecord _paramData;
        public BillsPaymentRequestIndividualRecordDataAccess(BillsPaymentRequestParamIndividualRecord paramData)
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
                    cmd.CommandText = "[adms.bills].[spGetBillsPaymentRequestIndividualRecord_Admin]";
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@DocumentRefID", SqlDbType = SqlDbType.Int, Value = _paramData.DocumentRefID });

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
                                
                                reader.Read();
                                getDataReturn.BillHeader = new BillsPaymentRequestHeaderRefDataModel
                                {
                                    DocumentRefID = Convert.ToInt32(reader["DocumentRefID"]),
                                    ReferenceNo = reader["ReferenceNo"].ToString(),
                                    FormDate = reader["FormDate"] as DateTime? ?? default,
                                    ProjectID = Convert.ToInt32(reader["ProjectOriginID"]),
                                    ProjectNumber = reader["ProjectNumberOrigin"].ToString(),
                                    ProjectName = reader["ProjectNameOrigin"].ToString(),
                                    ApproverStatusID = Convert.ToInt32(reader["ApproverStatusID"]),
                                    ApproverStatus = reader["ApproverStatus"].ToString(),
                                    LocationStatusID = Convert.ToInt32(reader["LocationStatusID"]),
                                    LocationStatus = reader["LocationStatus"].ToString(),
                                    IsRead = reader["IsRead"] as bool? ?? default,
                                    PreparedByName = reader["PreparedByName"].ToString(),
                                    ApprovedByName = reader["ApprovedByName"].ToString()
                                };

                                reader.NextResult();

                                getDataReturn.BillDetail = new List<BillsPaymentRequestDetailRefDataModel>();

                                while (reader.Read())
                                {
                                    getDataReturn.BillDetail.Add(new BillsPaymentRequestDetailRefDataModel
                                    {
                                        BillsPaymentRequestDetailID = Convert.ToInt32(reader["BillsPaymentRequestDetailID"]),
                                        BillsPaymentTypeID = Convert.ToInt32(reader["BillsPaymentTypeID"]),
                                        BillsPaymentType = reader["BillsPaymentType"].ToString(),
                                        Amount = float.Parse(reader["Amount"].ToString()),
                                        AddedByName = reader["AddedByName"].ToString(),
                                        AmountAddedByName = reader["AmountAddedByName"].ToString(),
                                        DeletedByName = reader["DeletedByName"].ToString(),
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
