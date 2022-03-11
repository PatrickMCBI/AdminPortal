using BusinessRef.Interfaces.Customs;
using BusinessRef.Interfaces.Generics;
using BusinessRef.Model.BillingPaymentRequest;
using DataAccess.BillsPaymentRequest;

using model = BusinessRef.Model.BillingPaymentRequest.BillsPaymentRequestReturnApproveDataModel;

namespace BusinessLogic.BillsPaymentRequest
{
    public class BillsPaymentRequestApproveDataLogic : IBillsPaymentRequestApproveData
    {
        private readonly BillsPaymentRequestParamApproveDataModel _paramData;

        public BillsPaymentRequestApproveDataLogic(BillsPaymentRequestParamApproveDataModel paramData)
        {
            _paramData = paramData;
        }
        public model GetDmlBillsPaymentRequestApproveData()
        {
            IPostDatabaseData<model> postDatabase = new BillsPaymentRequestApproveDataAccess(_paramData);
            return postDatabase.PostDatabaseData();
        }
    }
}
