
using BusinessRef.Interfaces.Customs;
using BusinessRef.Interfaces.Generics;
using BusinessRef.Model.FundRequest;
using DataAccess.FundRequest;

using model = BusinessRef.Model.FundRequest.FundRequestReturnNewDataModel;

namespace BusinessLogic.FundRequest
{
    public class FundRequestNewDataLogic : IFundrequestNewData
    {
        private readonly FundRequestParamNewDataModel _paramData;
        public FundRequestNewDataLogic(FundRequestParamNewDataModel paramData)
        {
            _paramData = paramData;
        }
        public model GetDmlFundrequestNewData()
        {
            IPostDatabaseData<model> postDatabase = new FundRequestNewDataAccess(_paramData);
            return postDatabase.PostDatabaseData();
        }
    }
}
