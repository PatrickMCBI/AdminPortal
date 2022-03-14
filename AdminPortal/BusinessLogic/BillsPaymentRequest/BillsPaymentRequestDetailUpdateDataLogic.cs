using BusinessRef.Interfaces.Customs;
using BusinessRef.Interfaces.Generics;
using BusinessRef.Model.BillingPaymentRequest;
using DataAccess.BillsPaymentRequest;

using model = BusinessRef.Model.BillingPaymentRequest.BillsPaymentRequestReturnUpdateDetailDataModel;
namespace BusinessLogic.BillsPaymentRequest
{
    public class BillsPaymentRequestDetailUpdateDataLogic : IBillsPaymentRequestDetailUpdateData
    {
        private readonly BillsPaymentRequestParamUpdateDetailDataModel _paramData;

        public BillsPaymentRequestDetailUpdateDataLogic(BillsPaymentRequestParamUpdateDetailDataModel paramData)
        {
            _paramData = paramData;
        }
        public model GetDmlBillsPaymentRequestDetailUpdateData()
        {
            IPostDatabaseData<model> postDatabase = new BillsPaymentRequestDetailUpdateDataAccess(_paramData);
            return postDatabase.PostDatabaseData();
        }
    }
}