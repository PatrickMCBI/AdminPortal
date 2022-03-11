using BusinessRef.Interfaces.Customs;
using BusinessRef.Interfaces.Generics;
using BusinessRef.Model.BillingPaymentRequest;
using DataAccess.BillsPaymentRequest;

using model = BusinessRef.Model.BillingPaymentRequest.BillsPaymentRequestReturnIndividualRecord;

namespace BusinessLogic.BillsPaymentRequest
{
    public class BillsPaymentRequestIndividualRecordDataLogic : IBillsPaymentRequestIndividualRecordData
    {
        private readonly BillsPaymentRequestParamIndividualRecord _paramData;
        public BillsPaymentRequestIndividualRecordDataLogic(BillsPaymentRequestParamIndividualRecord paramData)
        {
            _paramData = paramData;
        }
        public model GetBillsPaymentRequestIndividualRecordData()
        {
            IGetDatabaseData<model> getDatabase = new BillsPaymentRequestIndividualRecordDataAccess(_paramData);
            return getDatabase.GetDatabaseData();
        }
    }
}
