using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

using BusinessRef.Interfaces.Generics;
using BusinessRef.Model.References;
using model = BusinessRef.Model.EmployeeTravel.TravelRequestReturnNewRefDataModel;

namespace DataAccess.EmployeeTravel
{
    public class TravelRequestNewRefDataAccess : IGetDatabaseData<model>
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
                    cmd.CommandText = "[adms.travel].[spGetTravelRequestNewReferenceData]";
                    cmd.CommandType = CommandType.StoredProcedure;

                    using (SqlDataReader reader = cmd.ExecuteReader())
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
                                refDataModel.ProjectNumber = new List<TravelRequestProjectNumberRefDataModel>();

                                while (reader.Read())
                                {
                                    refDataModel.ProjectNumber.Add(new TravelRequestProjectNumberRefDataModel
                                    {
                                        ProjectID = Convert.ToInt32(reader["ProjectID"]),
                                        ProjectNumber = reader["ProjectNumber"].ToString(),


                                    });
                                }


                                reader.NextResult();

                                refDataModel.ProjectName = new List<TravelRequestProjectNameRefDataModel>();

                                while (reader.Read())
                                {
                                    refDataModel.ProjectName.Add(new TravelRequestProjectNameRefDataModel
                                    {
                                        ProjectID = Convert.ToInt32(reader["ProjectID"]),
                                        ProjectName = reader["ProjectName"].ToString(),


                                    });
                                }

                                reader.NextResult();

                                refDataModel.TransportMode = new List<TravelTransportModeRefDataModel>();

                                while (reader.Read())
                                {
                                    refDataModel.TransportMode.Add(new TravelTransportModeRefDataModel
                                    {
                                        ID = Convert.ToInt32(reader["ID"]),
                                        TransportMode = reader["TransportMode"].ToString(),
                                    });
                                }

                                reader.NextResult();

                                refDataModel.AccomodationType = new List<TravelAccomodationTypeRefDataModel>();

                                while (reader.Read())
                                {
                                    refDataModel.AccomodationType.Add(new TravelAccomodationTypeRefDataModel
                                    {
                                        ID = Convert.ToInt32(reader["ID"]),
                                        AccomodationType = reader["AccomodationType"].ToString()
                                    });
                                }

                                reader.NextResult();

                                refDataModel.EmployeeName = new List<TravelEmployeeNameRefDataModel>();

                                while (reader.Read())
                                {
                                    refDataModel.EmployeeName.Add(new TravelEmployeeNameRefDataModel
                                    {
                                        ID = Convert.ToInt32(reader["ID"]),
                                        EmployeeName = reader["EmployeeName"].ToString(),
                                        EmployeeID = reader["EmployeeID"].ToString(),
                                    });
                                }

                                reader.NextResult();
                                reader.Read();
                                refDataModel.StatusCodeNumber = Convert.ToInt32(reader["StatusCodeNumber"]);
                            }

                        }
                    }
                }
            }

            return refDataModel;
        }
    }
}
