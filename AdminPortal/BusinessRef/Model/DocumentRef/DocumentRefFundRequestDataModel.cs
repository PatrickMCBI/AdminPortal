using System;

namespace BusinessRef.Model.DocumentRef
{
    public class DocumentRefFundRequestDataModel
    {
        public int DocumentRefID { get; set; }
        public string ReferenceNo { get; set; }
        public DateTime FormDate { get; set; }
        public int ProjectID { get; set; }
        public string ProjectName { get; set; }
        public string ReferenceNo_Doc { get; set; }
        public int ApproverStatusID { get; set; }
        public string ApproverStatus { get; set; }
        public int LocationStatusID { get; set; }
        public string LocationStatus { get; set; }
        public bool IsRead { get; set; }
        public DateTime ApprovalStatusDate { get; set; }
    }
}
