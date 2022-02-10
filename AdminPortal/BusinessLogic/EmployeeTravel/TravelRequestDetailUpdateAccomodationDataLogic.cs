using BusinessRef.Interfaces.Customs;
using BusinessRef.Interfaces.Generics;
using BusinessRef.Model.EmployeeTravel;
using DataAccess.EmployeeTravel;

using model = BusinessRef.Model.References.StatusCodeNumberReturnRefDataModel;

namespace BusinessLogic.EmployeeTravel
{
    public class TravelRequestDetailUpdateAccomodationDataLogic : ITravelRequestDetailAccomodationUpdateData
    {
        private readonly TravelRequestDetailParamAccomodationUpdateDataModel _detailParamUpdateDataModel;

        public TravelRequestDetailUpdateAccomodationDataLogic(TravelRequestDetailParamAccomodationUpdateDataModel detailParamUpdateDataModel)
        {
            _detailParamUpdateDataModel = detailParamUpdateDataModel;
        }
        public model GetDmlTravelRequestDetailAccomodationUpdateData()
        {
            IPostDatabaseData<model> postDatabase = new TravelRequestDetailUpdateAccomodationDataAccess(_detailParamUpdateDataModel);

            return postDatabase.PostDatabaseData();
        }
    }
}
