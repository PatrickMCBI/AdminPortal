using BusinessRef.Interfaces.Customs;
using BusinessRef.Interfaces.Generics;
using BusinessRef.Model.BillingPaymentRequest;
using DataAccess.BillsPaymentRequest;

using model = BusinessRef.Model.BillingPaymentRequest.BillsPaymentRequestReturnRecordReference;

namespace BusinessLogic.BillsPaymentRequest
{
    public class BillsPaymentRequestReferenceRecordDataLogic : IBillsPaymentRequestReferenceRecordData
    {
        private readonly BillsPaymentRequestParamRecordReference _paramData;
        public BillsPaymentRequestReferenceRecordDataLogic(BillsPaymentRequestParamRecordReference paramData)
        {
            _paramData = paramData;
        }
        public model GetBillsPaymentRequestReferenceRecordData()
        {
            IGetDatabaseData<model> getDatabase = new BillsPaymentRequestReferenceRecordDataAccess(_paramData);
            return getDatabase.GetDatabaseData();
        }
    }
}
