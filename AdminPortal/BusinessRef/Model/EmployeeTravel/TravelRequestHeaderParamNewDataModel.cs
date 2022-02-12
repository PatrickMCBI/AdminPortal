﻿using System;

namespace BusinessRef.Model.EmployeeTravel
{
    public class TravelRequestHeaderParamNewDataModel
    {
        public int ProjectIDOrigin { get; set; }
        public int ProjectIDDestination { get; set; }
        public DateTime FormDate { get; set; }
        public DateTime TravelDate { get; set; }
        public string TravelPurpose { get; set; }
        public int UserNameID { get; set; }
        public DateTime ReturnDate { get; set; }
    }
}
