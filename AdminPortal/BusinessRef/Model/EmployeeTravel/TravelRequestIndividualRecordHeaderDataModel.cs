using System;

namespace BusinessRef.Model.EmployeeTravel
{
    public class TravelRequestIndividualRecordHeaderDataModel
    {
        public int DocumentRefID { get; set; }
        public string ReferenceNo { get; set; }
        public DateTime FormDate { get; set; }
        public int ProjectOriginID { get; set; }
        public string ProjectNumberOrigin { get; set; }
        public string ProjectNameOrigin { get; set; }
        public int ProjectDestinationID { get; set; }
        public string ProjectNumberDestination { get; set; }
        public string ProjectNameDestination { get; set; }
        public DateTime TravelDate { get; set; }
        public int ApproverStatusID { get; set; }
        public string ApproverStatus { get; set; }
        public int LocationStatusID { get; set; }
        public string LocationStatus { get; set; }
        public bool IsRead { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime ApprovalStatusDate { get; set; }
        public DateTime LocationStatusDate { get; set; }
        public string PreparedByName { get; set; }
        public string ApprovedByName { get; set; }
        public string TravelPurpose { get; set; }
        public string ApprovedByPositionName { get; set; }
        public string PreparedByPositionName { get; set; }
        public DateTime ReturnDate { get; set; }
    }
}
