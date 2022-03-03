using BusinessRef.Interfaces.Customs;
using BusinessRef.Interfaces.Generics;
using BusinessRef.Model.FundRequest;
using DataAccess.FundRequest;

using model = BusinessRef.Model.FundRequest.FundRequestReturnIndividualRecordDataModel;

namespace BusinessLogic.FundRequest
{
    public class FundRequestIndividualRecordDataLogic : IFundrequestIndividualRecordData
    {
        private readonly FundRequestParamIndividualRecordDataModel _paramData;
        public FundRequestIndividualRecordDataLogic(FundRequestParamIndividualRecordDataModel paramData)
        {
            _paramData = paramData;
        }
        public model GetIndividualRecordData()
        {
            IGetDatabaseData<model> getDatabase = new FundRequestIndividualRecordDataAccess(_paramData);
            return getDatabase.GetDatabaseData();
        }
    }
}
