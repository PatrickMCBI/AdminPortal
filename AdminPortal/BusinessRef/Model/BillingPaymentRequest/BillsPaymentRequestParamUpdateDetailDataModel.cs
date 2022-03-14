

namespace BusinessRef.Model.BillingPaymentRequest
{
    public class BillsPaymentRequestParamUpdateDetailDataModel
    {
        public int BillsPaymentRequestDetailID { get; set; }
        public int DocumentRefID { get; set; }
        public int BillsPaymentTypeID { get; set; }
        public float Amount { get; set; }
        public int UserNameID { get; set; }
    }
}
