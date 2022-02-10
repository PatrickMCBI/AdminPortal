using BusinessRef.Interfaces.Customs;
using BusinessRef.Interfaces.Generics;
using BusinessRef.Model.EmployeeTravel;
using DataAccess.EmployeeTravel;

using model = BusinessRef.Model.References.StatusCodeNumberReturnRefDataModel;

namespace BusinessLogic.EmployeeTravel
{
    public class TravelRequestDetailUpdateEmployeeNameDataLogic : ITravelRequestDetailEmployeeNameUpdateData
    {
        private readonly TravelRequestDetailParamEmployeeNameUpdateDataModel _detailParamUpdateDataModel;

        public TravelRequestDetailUpdateEmployeeNameDataLogic(TravelRequestDetailParamEmployeeNameUpdateDataModel detailParamUpdateDataModel)
        {
            _detailParamUpdateDataModel = detailParamUpdateDataModel;
        }
        public model GetDmlTravelRequestDetailEmployeeNameUpdateData()
        {
            IPostDatabaseData<model> postDatabase = new TravelRequestDetailUpdateEmployeeNameDataAccess(_detailParamUpdateDataModel);

            return postDatabase.PostDatabaseData();
        }
    }
}
