using System;

namespace BusinessRef.Model.DocumentRef
{
    public class DocumentRefFundRequestHeaderIndividualDataModel
    {
        public int DocumentRefID { get; set; }
        public int FundRequestDetailID { get; set; }
        public string ReferenceNo { get; set; }
        public DateTime FormDate { get; set; }
        public string ProjectNumber { get; set; }
        public string ProjectName { get; set; }
        public string ReferenceNo_Doc { get; set; }
        public float Amount { get; set; }
        public int ApproverStatusID { get; set; }
        public string ApproverStatus { get; set; }
        public int LocationStatusID { get; set; }
        public string LocationStatus { get; set; }
        public bool IsRead { get; set; }
        public DateTime ApprovalStatusDate { get; set; }
        public int AccountTitleID { get; set; }
        public string AccountTitle { get; set; }
        public string PreparedByName { get; set; }
        public string ReviewedByName { get; set; }
        public string ApprovedByName { get; set; }
    }
}
