using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

using BusinessRef.Interfaces.Customs;
using BusinessRef.Interfaces.Generics;
using BusinessRef.Model.FundRequest;
using BusinessRef.Model.References;
using BusinessRef.Model.DocumentRef;

using model = BusinessRef.Model.FundRequest.FundRequestReturnRecordRefDataModel;
using System.Collections.Generic;

namespace DataAccess.FundRequest
{
    public class FundRequestRecordRefDataAccess : IGetDatabaseData<model>
    {
        private readonly FundRequestParamRecordRefDataModel _paramData;
        public FundRequestRecordRefDataAccess(FundRequestParamRecordRefDataModel paramData)
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
                    cmd.CommandText = "[ams.accounting].[spGetFundRequestRecordReference_Sender]";
                    cmd.CommandType = CommandType.StoredProcedure;

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
                                paramDataReturn.ProjectNameList = new List<TravelRequestProjectNameRefDataModel>();

                                while (reader.Read())
                                {
                                    paramDataReturn.ProjectNameList.Add(new TravelRequestProjectNameRefDataModel
                                    {
                                        ProjectID = Convert.ToInt32(reader["ProjectID"]),
                                        ProjectName = reader["ProjectName"].ToString()
                                    });
                                }

                                reader.NextResult();
                                paramDataReturn.FundRequestList = new List<DocumentRefFundRequestDataModel>();

                                while (reader.Read())
                                {
                                    paramDataReturn.FundRequestList.Add(new DocumentRefFundRequestDataModel
                                    {
                                        DocumentRefID = Convert.ToInt32(reader["DocumentRefID"]),
                                        ReferenceNo = reader["ReferenceNo"].ToString(),
                                        FormDate = reader["FormDate"] as DateTime? ?? default,
                                        ProjectID = Convert.ToInt32(reader["ProjectID"]),
                                        ProjectName = reader["ProjectName"].ToString(),
                                        ReferenceNo_Doc = reader["ReferenceNo_Doc"].ToString(),
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
