using BusinessRef.Abstract;

namespace BusinessRef.Model.EmployeeTravel
{
    public class TravelRequestDetailReturnItineraryNewDataModel : ErrorStatus
    {
        public int IteneraryDetailID { get; set; }
        public int StatusCodeNumber { get; set; }
    }
}
