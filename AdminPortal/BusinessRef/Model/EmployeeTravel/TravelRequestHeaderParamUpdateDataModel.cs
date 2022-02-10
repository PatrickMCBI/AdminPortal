using System;

namespace BusinessRef.Model.EmployeeTravel
{
    public class TravelRequestHeaderParamUpdateDataModel
    {
        public int DocumentRefID { get; set; }
        public int ProjectIDOrigin { get; set; }
        public int ProjectIDDestination { get; set; }
        public DateTime FormDate { get; set; }
        public DateTime TravelDate { get; set; }
        public string TravelPurpose { get; set; }
        public int UserNameID { get; set; }
    }
}
