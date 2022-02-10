using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

using BusinessRef.Interfaces.Generics;
using BusinessRef.Model.References;
using BusinessRef.Model.EmployeeTravel;

using model = BusinessRef.Model.EmployeeTravel.TravelRequestRecordReturnRefDataModel;

namespace DataAccess.EmployeeTravel
{
    public class TravelRequestRecordRefDataAccess : IGetDatabaseData<model>
    {
        public model GetDatabaseData()
        {
            string connString = ConfigurationManager.ConnectionStrings["ERP_DBCS"].ConnectionString;

            model refDataModel = new model();

            using (SqlConnection con = new SqlConnection(connString))
            {
                con.Open();

                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = con;
                    cmd.CommandText = "[adms.travel].[spGetTravelRequestRecordReferenceData]";
                    cmd.CommandType = CommandType.StoredProcedure;

                    using(SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.GetSchemaTable().Rows[0].ItemArray[0].ToString() == "ErrorMessage")
                        {
                            if (reader.HasRows)
                            {
                                reader.Read();

                                refDataModel.HasError = true;
                                refDataModel.ErrorMessage = reader["ErrorMessage"].ToString();
                            }

                        }
                        else
                        {
                            if (reader.HasRows)
                            {
                                refDataModel.ProjectList = new List<TravelRequestProjectNameRefDataModel>();

                                while (reader.Read()) 
                                {
                                    refDataModel.ProjectList.Add(new TravelRequestProjectNameRefDataModel
                                    {
                                        ProjectID = reader["ProjectID"] as int? ?? default,
                                        ProjectName = reader["ProjectName"].ToString()
                                    });
                                }

                                reader.NextResult();

                                refDataModel.RecordList = new List<TravelRequestRecordDataModel>();

                                while(reader.Read())
                                {
                                    refDataModel.RecordList.Add(new TravelRequestRecordDataModel
                                    {
                                        DocumentRefID = reader["DocumentRefID"] as int? ?? default,
                                        ReferenceNo = reader["ReferenceNo"].ToString(),
                                        FormDate = reader["FormDate"] as DateTime? ?? default,
                                        ProjectOriginID = reader["ProjectOriginID"] as int? ?? default,
                                        ProjectOrigin = reader["ProjectOrigin"].ToString(),
                                        ProjectDestinationID = reader["ProjectDestinationID"] as int? ?? default,
                                        ProjectDestination = reader["ProjectDestination"].ToString(),
                                        TravelDate = reader["TravelDate"] as DateTime? ?? default,
                                        ApproverStatusID = reader["ApproverStatusID"] as int? ?? default,
                                        ApproverStatus = reader["ApproverStatus"].ToString(),
                                        LocationStatusID = reader["LocationStatusID"] as int? ?? default,
                                        LocationStatus = reader["LocationStatus"].ToString(),
                                        IsRead = reader["IsRead"] as bool? ?? default,
                                        ApprovalStatusDate = reader["ApprovalStatusDate"] as DateTime? ?? default
                                    });
                                    
                                }

                                reader.NextResult();
                                reader.Read();

                                refDataModel.StatusCodeNumber = reader["StatusCodeNumber"] as int? ?? default;
                            }
                        }
                    }
                }
            }

            return refDataModel;
        }
    }
}
