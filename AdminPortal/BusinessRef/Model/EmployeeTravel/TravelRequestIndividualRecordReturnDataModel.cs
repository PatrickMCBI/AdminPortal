using BusinessRef.Abstract;
using BusinessRef.Model.References;
using System.Collections.Generic;

namespace BusinessRef.Model.EmployeeTravel
{
    public class TravelRequestIndividualRecordReturnDataModel : ErrorStatus
    {
        public ICollection<TravelRequestProjectNumberRefDataModel> ProjectNumberList { get; set; }
        public ICollection<TravelRequestProjectNameRefDataModel> ProjectNameList { get; set; }
        public ICollection<TravelTransportModeRefDataModel> TransportModeList { get; set; }
        public ICollection<TravelAccomodationTypeRefDataModel> AccomodationTypeList { get; set; }
        public ICollection<TravelEmployeeNameRefDataModel> EmployeeList { get; set; }
        public TravelRequestIndividualRecordHeaderDataModel HeaderList { get; set; }
        public ICollection<TravelRequestIndividualRecordEmployeeDetailDataModel> EmployeeDetailList { get; set; }
        public ICollection<TravelRequestIndividualRecordItineraryDetailDataModel> ItineraryDetailList { get; set; }
        public ICollection<TravelRequestIndividualRecordAccomodationDetailDataModel> AccomodationDetailList { get; set; }
        public ICollection<NoteDataModel> NoteList { get; set; }
        public int StatusCodeNumber { get; set; }
    }
}
