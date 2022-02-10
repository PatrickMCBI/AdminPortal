using BusinessRef.Abstract;

namespace BusinessRef.Model.EmployeeTravel
{
    public class TravelRequestDetailReturnEmployeeNameNewDataModel : ErrorStatus
    {
        public int EmployeeDetailID { get; set; }
        public int StatusCodeNumber { get; set; }
    }
}
