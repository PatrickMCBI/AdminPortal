
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

using BusinessRef.Interfaces.Generics;
using BusinessRef.Model.DocumentRef;
using model = BusinessRef.Model.BillingPaymentRequest.BillsPaymentRequestReturnPendingAdminDataModel;

namespace DataAccess.BillsPaymentRequest
{
    public class BillsPaymentRequestPendingAdminDataAccess : IGetDatabaseData<model>
    {
        public model GetDatabaseData()
        {
            string connString = ConfigurationManager.ConnectionStrings["ERP_DBCS"].ConnectionString;

            model dataModelReturn = new model();


            using (SqlConnection con = new SqlConnection(connString))
            {
                con.Open();

                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = con;
                    cmd.CommandText = "[global].[GetDocumentPendingAdmin]";
                    cmd.CommandType = CommandType.StoredProcedure;

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.GetSchemaTable().Rows[0].ItemArray[0].ToString() == "ErrorMessage")
                        {
                            if (reader.HasRows)
                            {
                                reader.Read();

                                dataModelReturn.HasError = true;
                                dataModelReturn.ErrorMessage = reader["ErrorMessage"].ToString();
                            }

                        }
                        else
                        {
                            dataModelReturn.PendingList = new List<DocumentRefBillsPaymentRefDataModel>();

                            while (reader.Read())
                            {
                                dataModelReturn.PendingList.Add(new DocumentRefBillsPaymentRefDataModel
                                {
                                    DocumentRefID = reader["DocumentRefID"] as int? ?? default,
                                    DocumentTypeID = reader["DocumentTypeID"] as int? ?? default,
                                    ReferenceNo = reader["ReferenceNo"].ToString(),
                                    DateInserted = reader["DateInserted"] as DateTime? ?? default,
                                    ProjectName = reader["ProjectName"].ToString(),
                                    IsRead = reader["IsRead"] as bool? ?? default
                                });

                            }


                            reader.NextResult();
                            reader.Read();

                            dataModelReturn.StatusCodeNumber = Convert.ToInt32(reader["StatusCodeNumber"]);

                        }
                    }
                }
            }

            return dataModelReturn;
        }
    }
}
