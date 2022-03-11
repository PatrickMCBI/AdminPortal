using BusinessRef.Interfaces.Customs;
using BusinessRef.Interfaces.Generics;
using BusinessRef.Model.BillingPaymentRequest;
using DataAccess.BillsPaymentRequest;

using model = BusinessRef.Model.BillingPaymentRequest.BillsPaymentRequestReturnReadDataModel;

namespace BusinessLogic.BillsPaymentRequest
{
    public class  BillsPaymentRequestReadDataLogic : IBillsPaymentRequestReadData
    {
        private readonly BillsPaymentRequestParamReadDataModel _paramData;
        public BillsPaymentRequestReadDataLogic(BillsPaymentRequestParamReadDataModel paramData)
        {
            _paramData = paramData;
        }
        public model GetBillsPaymentRequestReadData()
        {
            IGetDatabaseData<model> getDatabase = new BillsPaymentRequestReadDataAccess(_paramData);
            return getDatabase.GetDatabaseData();
        }
    }
}
