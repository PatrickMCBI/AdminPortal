using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

using BusinessRef.Interfaces.Generics;
using BusinessRef.Model.References;
using BusinessRef.Model.EmployeeTravel;

using model = BusinessRef.Model.EmployeeTravel.TravelRequestIndividualRecordReturnDataModel;

namespace DataAccess.EmployeeTravel
{
    public class TravelRequestIndividualRecordDataAccess : IGetDatabaseData<model>
    {
        private readonly TravelRequestIndividualRecordParamDataModel _dataModel;
        public TravelRequestIndividualRecordDataAccess(TravelRequestIndividualRecordParamDataModel dataModel)
        {
            _dataModel = dataModel;
        }

        public model GetDatabaseData()
        {
            string connString = ConfigurationManager.ConnectionStrings["ERP_DBCS"].ConnectionString;

            model refDataModel = new model();

            using(SqlConnection con = new SqlConnection(connString))
            {
                con.Open();

                using(SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = con;
                    cmd.CommandText = "[adms.travel].[spGetTravelRequestIndividualRecord]";
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@DocumentRefID", SqlDbType = SqlDbType.Int, Value = _dataModel.DocumentRefID });

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
                            if(reader.HasRows)
                            {
                                refDataModel.ProjectNumberList = new List<TravelRequestProjectNumberRefDataModel>();

                                while(reader.Read())
                                {
                                    refDataModel.ProjectNumberList.Add(new TravelRequestProjectNumberRefDataModel
                                    {
                                        ProjectID = reader["ProjectID"] as int? ?? default,
                                        ProjectNumber = reader["ProjectNumber"].ToString()
                                    });
                                }

                                reader.NextResult();
                                refDataModel.ProjectNameList = new List<TravelRequestProjectNameRefDataModel>();

                                while(reader.Read())
                                {
                                    refDataModel.ProjectNameList.Add(new TravelRequestProjectNameRefDataModel
                                    {
                                        ProjectID = reader["ProjectID"] as int? ?? default,
                                        ProjectName = reader["ProjectName"].ToString()
                                    });
                                }

                                reader.NextResult();
                                refDataModel.TransportModeList = new List<TravelTransportModeRefDataModel>();

                                while (reader.Read())
                                {
                                    refDataModel.TransportModeList.Add(new TravelTransportModeRefDataModel
                                    {
                                        ID = reader["ID"] as int? ?? default,
                                        TransportMode = reader["TransportMode"].ToString()
                                    });
                                }

                                reader.NextResult();
                                refDataModel.AccomodationTypeList = new List<TravelAccomodationTypeRefDataModel>();

                                while (reader.Read())
                                {
                                    refDataModel.AccomodationTypeList.Add(new TravelAccomodationTypeRefDataModel
                                    {
                                        ID = reader["ID"] as int? ?? default,
                                        AccomodationType = reader["AccomodationType"].ToString()
                                    });
                                }

                                reader.NextResult();
                                refDataModel.EmployeeList = new List<TravelEmployeeNameRefDataModel>();

                                while(reader.Read())
                                {
                                    refDataModel.EmployeeList.Add(new TravelEmployeeNameRefDataModel
                                    {
                                        ID = reader["ID"] as int? ?? default,
                                        EmployeeID = reader["EmployeeID"].ToString(),
                                        EmployeeName = reader["FirstName"].ToString() + " " + reader["LastName"].ToString()
                                    });
                                }

                                reader.NextResult();
                                refDataModel.HeaderList = new TravelRequestIndividualRecordHeaderDataModel();

                                reader.Read();

                                refDataModel.HeaderList.DocumentRefID = reader["DocumentRefID"] as int? ?? default;
                                refDataModel.HeaderList.ReferenceNo = reader["ReferenceNo"].ToString();
                                refDataModel.HeaderList.FormDate = reader["FormDate"] as DateTime? ?? default;
                                refDataModel.HeaderList.ProjectOriginID = reader["ProjectOriginID"] as int? ?? default;
                                refDataModel.HeaderList.ProjectNumberOrigin = reader["ProjectNumberOrigin"].ToString();
                                refDataModel.HeaderList.ProjectNameOrigin = reader["ProjectNameOrigin"].ToString();
                                refDataModel.HeaderList.ProjectDestinationID = reader["ProjectDestinationID"] as int? ?? default;
                                refDataModel.HeaderList.ProjectNumberDestination = reader["ProjectNumberDestination"].ToString();
                                refDataModel.HeaderList.ProjectNameDestination = reader["ProjectNameDestination"].ToString();
                                refDataModel.HeaderList.TravelDate = reader["TravelDate"] as DateTime? ?? default;
                                refDataModel.HeaderList.ApproverStatusID = reader["ApproverStatusID"] as int? ?? default;
                                refDataModel.HeaderList.ApproverStatus = reader["ApproverStatus"].ToString();
                                refDataModel.HeaderList.LocationStatusID = reader["LocationStatusID"] as int? ?? default;
                                refDataModel.HeaderList.LocationStatus = reader["LocationStatus"].ToString();
                                refDataModel.HeaderList.IsRead = reader["IsRead"] as bool? ?? default;
                                refDataModel.HeaderList.DateCreated = reader["DateCreated"] as DateTime? ?? default;
                                refDataModel.HeaderList.ApprovalStatusDate = reader["ApprovalStatusDate"] as DateTime? ?? default;
                                refDataModel.HeaderList.LocationStatusDate = reader["LocationStatusDate"] as DateTime? ?? default;
                                refDataModel.HeaderList.PreparedByName = reader["PreparedByName"].ToString();
                                refDataModel.HeaderList.ApprovedByName = reader["ApprovedByName"].ToString();
                                refDataModel.HeaderList.TravelPurpose = reader["TravelPurpose"].ToString();

                                reader.NextResult();
                                refDataModel.EmployeeDetailList = new List<TravelRequestIndividualRecordEmployeeDetailDataModel>();

                                while (reader.Read())
                                {
                                    refDataModel.EmployeeDetailList.Add(new TravelRequestIndividualRecordEmployeeDetailDataModel
                                    {
                                        EmployeeDetailID = reader["EmployeeDetailID"] as int? ?? default,
                                        EmployeeID = reader["EmployeeID"] as int? ?? default,
                                        EmployeeName = reader["EmployeeName"].ToString(),
                                        BaggageWeight = float.Parse(reader["BaggageWeight"].ToString())
                                    });
                                }

                                reader.NextResult();
                                refDataModel.ItineraryDetailList = new List<TravelRequestIndividualRecordItineraryDetailDataModel>();

                                while (reader.Read())
                                {
                                    refDataModel.ItineraryDetailList.Add(new TravelRequestIndividualRecordItineraryDetailDataModel
                                    {
                                        ItineraryDetailID = reader["ItineraryDetailID"] as int? ?? default,
                                        From = reader["From"].ToString(),
                                        To = reader["To"].ToString(),
                                        TransportModeID = reader["TransportModeID"] as int? ?? default,
                                        TransportMode = reader["TransportMode"].ToString(),
                                        Fare = float.Parse(reader["Fare"].ToString())
                                    });
                                }

                                reader.NextResult();
                                refDataModel.AccomodationDetailList = new List<TravelRequestIndividualRecordAccomodationDetailDataModel>();

                                while (reader.Read())
                                {
                                    refDataModel.AccomodationDetailList.Add(new TravelRequestIndividualRecordAccomodationDetailDataModel
                                    {
                                        AccomodationDetailID = reader["AccomodationDetailID"] as int? ?? default,
                                        NoOfDays = float.Parse(reader["NoOfDays"].ToString()),
                                        Cost = float.Parse(reader["Cost"].ToString()),
                                        AccomodationTypeID = reader["AccomodationTypeID"] as int? ?? default,
                                        AccomodationType = reader["AccomodationType"].ToString()
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
