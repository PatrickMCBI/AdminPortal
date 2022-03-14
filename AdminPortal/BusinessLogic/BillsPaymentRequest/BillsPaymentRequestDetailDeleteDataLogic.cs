using BusinessRef.Interfaces.Customs;
using BusinessRef.Interfaces.Generics;
using BusinessRef.Model.BillingPaymentRequest;
using DataAccess.BillsPaymentRequest;

using model = BusinessRef.Model.BillingPaymentRequest.BillsPaymentRequestReturnDeleteDetailDataModel;

namespace BusinessLogic.BillsPaymentRequest
{
    public class BillsPaymentRequestDetailDeleteDataLogic : IBillsPaymentRequestDetailDeleteData
    {
        private readonly BillsPaymentRequestParamDeleteDetailDataModel _paramData;

        public BillsPaymentRequestDetailDeleteDataLogic(BillsPaymentRequestParamDeleteDetailDataModel paramData)
        {
            _paramData = paramData;
        }
        public model GetDmlBillsPaymentRequestDetailDeleteData()
        {
            IPostDatabaseData<model> postDatabase = new BillsPaymentRequestDetailDeleteDataAccess(_paramData);
            return postDatabase.PostDatabaseData();
        }
    }
}