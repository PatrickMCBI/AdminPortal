using System;

namespace BusinessRef.Model.References
{
    public class BillsPaymentRequestHeaderRefDataModel
    {
        public int DocumentRefID { get; set; }
        public string ReferenceNo { get; set; }
        public DateTime FormDate { get; set; }
        public int ProjectID { get; set; }
        public string ProjectNumber { get; set; }
        public string ProjectName { get; set; }
        public int ApproverStatusID { get; set; }
        public string ApproverStatus { get; set; }
        public int LocationStatusID { get; set; }
        public string LocationStatus { get; set; }
        public bool IsRead { get; set; }
        public DateTime ApprovalStatusDate { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime LocationStatusDate { get; set; }
        public string PreparedByName { get; set; }
        public string PreparedByPositionName { get; set; }
        public string ApprovedByName { get; set; }
        public string ApprovedByPositionName { get; set; }
    }
}
