

namespace BusinessRef.Model.EmployeeTravel
{
    public class TravelRequestDetailParamIteneraryUpdateDataModel
    {
        public int IteneraryDetailID { get; set; }
        public int DocumentRefID { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public int TransportModeID { get; set; }
        public float Fare { get; set; }
        public int UserNameID { get; set; }
    }
}
