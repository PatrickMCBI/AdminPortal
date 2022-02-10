using BusinessRef.Abstract;

namespace BusinessRef.Model.EmployeeTravel
{
    public class TravelRequestDetailReturnAccomodationNewDataModel : ErrorStatus
    {
        public int AccomodationDetailID { get; set; }
        public int StatusCodeNumber { get; set; }
    }
}
