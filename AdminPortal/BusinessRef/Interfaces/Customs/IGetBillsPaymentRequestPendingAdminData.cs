using BusinessRef.Model.BillingPaymentRequest;

namespace BusinessRef.Interfaces.Customs
{
    public interface IGetBillsPaymentRequestPendingAdminData
    {
        BillsPaymentRequestReturnPendingAdminDataModel GetBillsPaymentRequestPendingAdminData();
    }
}
