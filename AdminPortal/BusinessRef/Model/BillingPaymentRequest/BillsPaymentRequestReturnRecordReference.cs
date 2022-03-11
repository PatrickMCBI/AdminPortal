using BusinessRef.Abstract;
using BusinessRef.Model.References;
using System.Collections.Generic;


namespace BusinessRef.Model.BillingPaymentRequest
{
    public class BillsPaymentRequestReturnRecordReference : ErrorStatus
    {
        public ICollection<TravelRequestProjectNameRefDataModel> ProjectName { get; set; }
        public ICollection<BillsPaymentRequestHeaderRefDataModel> BillsList { get; set; }
        public int StatusCodeNumber { get; set; }
    }
}
