﻿using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

using BusinessRef.Interfaces.Generics;
using BusinessRef.Model.EmployeeTravel;
using model = BusinessRef.Model.References.StatusCodeNumberReturnRefDataModel;

namespace DataAccess.EmployeeTravel
{
    public class TravelRequestDetailUpdateAccomodationDataAccess : IPostDatabaseData<model>
    {
        private readonly TravelRequestDetailParamAccomodationUpdateDataModel _detailParamUpdateDataModel;

        public TravelRequestDetailUpdateAccomodationDataAccess(TravelRequestDetailParamAccomodationUpdateDataModel detailParamUpdateDataModel)
        {
            _detailParamUpdateDataModel = detailParamUpdateDataModel;
        }
        public model PostDatabaseData()
        {
            string connString = ConfigurationManager.ConnectionStrings["ERP_DBCS"].ConnectionString;

            model masterDataReturn = new model();

            using (SqlConnection con = new SqlConnection(connString))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = con;
                    cmd.CommandText = "[adms.travel].[spTravelRequestAccomodationDetailUpdateData]";
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@AccomodationDetailID", SqlDbType = SqlDbType.Int, Value = _detailParamUpdateDataModel.AccomodationDetailID });
                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@DocumentRefID", SqlDbType = SqlDbType.Int, Value = _detailParamUpdateDataModel.DocumentRefID });
                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@AccomodationTypeID", SqlDbType = SqlDbType.Int, Value = _detailParamUpdateDataModel.AccomodationTypeID });
                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@NoOfDays", SqlDbType = SqlDbType.Float, Value = _detailParamUpdateDataModel.NoOfDays });
                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@Cost", SqlDbType = SqlDbType.Float, Value = _detailParamUpdateDataModel.Cost });
                    cmd.Parameters.Add(new SqlParameter { ParameterName = "@UserNameID", SqlDbType = SqlDbType.Int, Value = _detailParamUpdateDataModel.UserNameID });
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.GetSchemaTable().Rows[0].ItemArray[0].ToString() == "ErrorMessage")
                        {
                            if (reader.HasRows)
                            {
                                reader.Read();

                                masterDataReturn.HasError = true;
                                masterDataReturn.ErrorMessage = reader["ErrorMessage"].ToString();
                            }


                        }
                        else
                        {
                            if (reader.HasRows)
                            {
                                reader.Read();
                                masterDataReturn.StatusCodeNumber = Convert.ToInt32(reader["StatusCodeNumber"]);


                            }

                        }
                    }

                }
            }

            return masterDataReturn;
        }
    }
}
