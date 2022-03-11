

using BusinessRef.Interfaces.Customs;
using BusinessRef.Interfaces.Generics;
using DataAccess.BillsPaymentRequest;

using model = BusinessRef.Model.BillingPaymentRequest.BillsPaymentRequestReturnPendingAdminDataModel;

namespace BusinessLogic.BillsPaymentRequest
{
    public class BillsPaymentRequestPendingAdminDataLogic : IGetBillsPaymentRequestPendingAdminData
    {
        public model GetBillsPaymentRequestPendingAdminData()
        {
            IGetDatabaseData<model> getDatabase = new BillsPaymentRequestPendingAdminDataAccess();

            return getDatabase.GetDatabaseData();
        }
    }
}
