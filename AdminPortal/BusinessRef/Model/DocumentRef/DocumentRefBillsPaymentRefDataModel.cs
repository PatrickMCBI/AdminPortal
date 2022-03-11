using System;

namespace BusinessRef.Model.DocumentRef
{
    public class DocumentRefBillsPaymentRefDataModel
    {
        public int DocumentRefID { get; set; }
        public int DocumentTypeID { get; set; }
        public string ReferenceNo { get; set; }
        public string ProjectName { get; set; }
        public DateTime DateInserted { get; set; }
        public bool IsRead { get; set; }
    }
}
