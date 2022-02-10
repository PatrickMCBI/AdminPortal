using BusinessRef.Abstract;
using BusinessRef.Model.References;
using System.Collections.Generic;

namespace BusinessRef.Model.EmployeeTravel
{
    public class TravelRequestRecordReturnRefDataModel : ErrorStatus
    {
        public ICollection<TravelRequestProjectNameRefDataModel> ProjectList { get; set; }
        public ICollection<TravelRequestRecordDataModel> RecordList { get; set; }
        public int StatusCodeNumber { get; set; }
    }
}
