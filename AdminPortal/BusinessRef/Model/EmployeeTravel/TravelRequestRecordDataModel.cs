
using System;

namespace BusinessRef.Model.EmployeeTravel
{
    public class TravelRequestRecordDataModel
    {
        public int DocumentRefID { get; set; }
        public string ReferenceNo { get; set; }
        public DateTime FormDate { get; set; }
        public int ProjectOriginID { get; set; }
        public string ProjectOrigin { get; set; }
        public int ProjectDestinationID { get; set; }
        public string ProjectDestination { get; set; }
        public DateTime TravelDate { get; set; }
        public int ApproverStatusID { get; set; }
        public string ApproverStatus { get; set; }
        public int LocationStatusID { get; set; }
        public string LocationStatus { get; set; }
        public bool IsRead { get; set; }
        public DateTime ApprovalStatusDate { get; set; }
    }
}
