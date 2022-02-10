using BusinessRef.Interfaces.Customs;
using BusinessRef.Interfaces.Generics;
using BusinessRef.Model.EmployeeTravel;
using DataAccess.EmployeeTravel;

using model = BusinessRef.Model.References.StatusCodeNumberReturnRefDataModel;

namespace BusinessLogic.EmployeeTravel
{
    public class TravelRequestDetailUpdateItineraryDataLogic : ITravelRequestDetailItineraryUpdateData
    {
        private readonly TravelRequestDetailParamIteneraryUpdateDataModel _detailParamUpdateDataModel;

        public TravelRequestDetailUpdateItineraryDataLogic(TravelRequestDetailParamIteneraryUpdateDataModel detailParamUpdateDataModel)
        {
            _detailParamUpdateDataModel = detailParamUpdateDataModel;
        }
        public model GetDmlTravelRequestDetailItineraryUpdateData()
        {
            IPostDatabaseData<model> postDatabase = new TravelRequestDetailUpdateItineraryDataAccess(_detailParamUpdateDataModel);

            return postDatabase.PostDatabaseData();
        }
    }
}
