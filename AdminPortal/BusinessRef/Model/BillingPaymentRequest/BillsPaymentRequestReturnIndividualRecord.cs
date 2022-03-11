using BusinessRef.Abstract;
using BusinessRef.Model.References;
using System.Collections.Generic;


namespace BusinessRef.Model.BillingPaymentRequest
{
    public class BillsPaymentRequestReturnIndividualRecord : ErrorStatus
    {
        public BillsPaymentRequestHeaderRefDataModel BillHeader { get; set; }
        public ICollection<BillsPaymentRequestDetailRefDataModel> BillDetail { get; set; }
        public int StatusCodeNumber { get; set; }
    }
}
