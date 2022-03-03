
using BusinessRef.Interfaces.Customs;
using BusinessRef.Interfaces.Generics;
using BusinessRef.Model.FundRequest;
using DataAccess.FundRequest;

using model = BusinessRef.Model.FundRequest.FundRequestReturnSendToAccountingDataModel;

namespace BusinessLogic.FundRequest
{
    public class FundRequestSendToAccountingDataLogic : IFundRequestSendToAccountingData
    {
        private readonly FundRequestParamSendToAccountingDataModel _paramData;
        public FundRequestSendToAccountingDataLogic(FundRequestParamSendToAccountingDataModel paramData)
        {
            _paramData = paramData;
        }
        public model GetDmlFundRequestSendToAccountingData()
        {
            IPostDatabaseData<model> postDatabase = new FundRequestSendToAccountingDataAccess(_paramData);
            return postDatabase.PostDatabaseData();
        }
    }
}
