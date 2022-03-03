using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

using BusinessRef.Interfaces.Generics;
using BusinessRef.Model.FundRequest;
using BusinessRef.Model.References;
using BusinessRef.Model.DocumentRef;

using model = BusinessRef.Model.FundRequest.FundRequestReturnIndividualRecordDataModel;
using System.Collections.Generic;


namespace DataAccess.FundRequest
{
    public class FundRequestIndividualRecordDataAccess : IGetDatabaseData<model>
    {
        private readonly FundRequestParamIndividualRecordDataModel _paramData;
        public FundRequestIndividualRecordDataAccess(FundRequestParamIndividualRecordDataModel paramData)
        {
            _paramData = paramData;
        }
        public model GetDatabaseData()
        {
            string connString = ConfigurationManager.ConnectionStrings["ERP_DBCS"].ConnectionString;

            model paramDataReturn = new model();

            using (SqlConnection con = new SqlConnection(connString))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = con;
                    cmd.CommandText = "[ams.accounting].[spGetFundRequestIndividualRecord]";
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@DocumentRefID", SqlDbType = SqlDbType.Int, Value = _paramData.DocumentRefID });


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
                                paramDataReturn.FundRequestRecords = new DocumentRefFundRequestHeaderIndividualDataModel();
                                reader.Read();

                                paramDataReturn.FundRequestRecords.DocumentRefID = reader["DocumentRefID"] as int? ?? default;
                                paramDataReturn.FundRequestRecords.FundRequestDetailID = reader["FundRequestDetailID"] as int? ?? default;
                                paramDataReturn.FundRequestRecords.ReferenceNo = reader["ReferenceNo"].ToString();
                                paramDataReturn.FundRequestRecords.FormDate = reader["FormDate"] as DateTime? ?? default;
                                paramDataReturn.FundRequestRecords.ProjectNumber = reader["ProjectNumber"].ToString();
                                paramDataReturn.FundRequestRecords.ProjectName = reader["ProjectName"].ToString();
                                paramDataReturn.FundRequestRecords.ReferenceNo_Doc = reader["ReferenceNo_Doc"].ToString();
                                paramDataReturn.FundRequestRecords.Amount = float.Parse(reader["Amount"].ToString());
                                paramDataReturn.FundRequestRecords.ApproverStatusID = reader["ApproverStatusID"] as int? ?? default;
                                paramDataReturn.FundRequestRecords.ApproverStatus = reader["ApproverStatus"].ToString();
                                paramDataReturn.FundRequestRecords.LocationStatusID = reader["LocationStatusID"] as int? ?? default;
                                paramDataReturn.FundRequestRecords.LocationStatus = reader["LocationStatus"].ToString();
                                paramDataReturn.FundRequestRecords.IsRead = reader["IsRead"] as bool? ?? default;
                                paramDataReturn.FundRequestRecords.ApprovalStatusDate = reader["ApprovalStatusDate"] as DateTime? ?? default;
                                paramDataReturn.FundRequestRecords.AccountTitleID = reader["AccountTitleID"] as int? ?? default;
                                paramDataReturn.FundRequestRecords.AccountTitle = reader["AccountTitle"].ToString();
                                paramDataReturn.FundRequestRecords.PreparedByName = reader["PreparedByName"].ToString();
                                paramDataReturn.FundRequestRecords.ReviewedByName = reader["ReviewedByName"].ToString();
                                paramDataReturn.FundRequestRecords.ApprovedByName = reader["ApprovedByName"].ToString();

                                reader.NextResult();
                                paramDataReturn.EWTList = new List<EWTaxRefDataModel>();

                                while (reader.Read())
                                {
                                    paramDataReturn.EWTList.Add(new EWTaxRefDataModel
                                    {
                                        FundRequestDetailID = Convert.ToInt32(reader["FundRequestDetailID"]),
                                        FundRequestDetailDeductionID = Convert.ToInt32(reader["FundRequestDetailDeductionID"]),
                                        DeductionID = Convert.ToInt32(reader["DeductionID"]),
                                        DeductionName = reader["DeductionName"].ToString(),
                                        Factor = float.Parse(reader["Factor"].ToString())
                                    });
                                }
                                reader.NextResult();
                                paramDataReturn.VATOrOthersList = new List<VATaxOrOthersRefDataModel>();

                                while (reader.Read())
                                {
                                    paramDataReturn.VATOrOthersList.Add(new VATaxOrOthersRefDataModel
                                    {
                                        FundRequestDetailID = Convert.ToInt32(reader["FundRequestDetailID"]),
                                        FundRequestDetailDeductionID = Convert.ToInt32(reader["FundRequestDetailDeductionID"]),
                                        DeductionID = Convert.ToInt32(reader["DeductionID"]),
                                        DeductionName = reader["DeductionName"].ToString(),
                                        Factor = float.Parse(reader["Factor"].ToString())
                                    });
                                }
                                reader.NextResult();
                                paramDataReturn.NoteList = new List<NoteDataModel>();

                                while (reader.Read())
                                {
                                    paramDataReturn.NoteList.Add(new NoteDataModel
                                    {
                                        Note = reader["Note"].ToString(),
                                        NoteDate = reader["Date"] as DateTime? ?? default,
                                        NoteCreatedByName = reader["NoteCreatedByName"].ToString()
                                    });
                                }

                                reader.NextResult();
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
