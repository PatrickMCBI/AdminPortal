using BusinessRef.Interfaces.Customs;
using BusinessRef.Interfaces.Generics;
using BusinessRef.Model.BillingPaymentRequest;
using DataAccess.BillsPaymentRequest;

using model = BusinessRef.Model.BillingPaymentRequest.BillsPaymentRequestReturnCancelnDataModel;

namespace BusinessLogic.BillsPaymentRequest
{
    public class BillsPaymentRequestCancelDataLogic : IBillsPaymentRequestCancelData
    {
        private readonly BillsPaymentRequestParamCancelnDataModel _paramData;

        public BillsPaymentRequestCancelDataLogic(BillsPaymentRequestParamCancelnDataModel paramData)
        {
            _paramData = paramData;
        }
        public model GetDmlBillsPaymentRequestCancelData()
        {
            IPostDatabaseData<model> postDatabase = new BillsPaymentRequestCancelDataAccess(_paramData);
            return postDatabase.PostDatabaseData();
        }
    }
}
