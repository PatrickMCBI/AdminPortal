using BusinessRef.Abstract;
using System.Collections.Generic;
using BusinessRef.Model.References;

namespace BusinessRef.Model.EmployeeTravel
{
    public class EmployeeTravelReturnNewRefDataModel : ErrorStatus
    {
        public ICollection<TravelRequestProjectNumberRefDataModel> ProjectNumber { get; set; }
        public ICollection<TravelRequestProjectNameRefDataModel> ProjectName { get; set; }
        public ICollection<TravelTransportModeRefDataModel> TransportMode { get; set; }
        public ICollection<TravelAccomodationTypeRefDataModel> AccomodationType { get; set; }
        public ICollection<TravelEmployeeNameRefDataModel> EmployeeName { get; set; }
        public int StatusCodeNumber { get; set; }
    }
}
