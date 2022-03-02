
using BusinessRef.Interfaces.Customs;
using BusinessRef.Interfaces.Generics;
using BusinessRef.Model.FundRequest;
using DataAccess.FundRequest;

using model = BusinessRef.Model.FundRequest.FundRequestReturnRecordRefDataModel;

namespace BusinessLogic.FundRequest
{
    public class FundRequestRecordRefDataLogic : IFundrequestRecordRefData
    {
        private readonly FundRequestParamRecordRefDataModel _paramData;
        public FundRequestRecordRefDataLogic(FundRequestParamRecordRefDataModel paramData)
        {
            _paramData = paramData;
        }
        public model GetFundrequestRecordRefData()
        {
            IGetDatabaseData<model> getDatabase = new FundRequestRecordRefDataAccess(_paramData);
            return getDatabase.GetDatabaseData();
        }
    }
}
