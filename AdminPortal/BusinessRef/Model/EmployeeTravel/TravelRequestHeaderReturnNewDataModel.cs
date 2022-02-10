using BusinessRef.Abstract;

namespace BusinessRef.Model.EmployeeTravel
{
    public class TravelRequestHeaderReturnNewDataModel : ErrorStatus
    {
        public int DocumentRefID { get; set; }
        public string ReferenceNo { get; set; }
        public int StatusCodeNumber { get; set; }
    }
}
