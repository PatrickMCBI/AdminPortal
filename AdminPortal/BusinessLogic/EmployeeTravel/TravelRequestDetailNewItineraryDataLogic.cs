using BusinessRef.Interfaces.Customs;
using BusinessRef.Interfaces.Generics;
using BusinessRef.Model.EmployeeTravel;
using DataAccess.EmployeeTravel;

using model = BusinessRef.Model.EmployeeTravel.TravelRequestDetailReturnItineraryNewDataModel;
namespace BusinessLogic.EmployeeTravel
{
    public class TravelRequestDetailNewItineraryDataLogic : ITravelRequestDetailItineraryNewData
    {
        private readonly TravelRequestDetailParamItineraryNewDataModel _detailParamNewDataModel;

        public TravelRequestDetailNewItineraryDataLogic(TravelRequestDetailParamItineraryNewDataModel detailParamNewDataModel)
        {
            _detailParamNewDataModel = detailParamNewDataModel;
        }
        public model GetDmlTravelRequestDetailItineraryNewData()
        {
            IPostDatabaseData<model> postDatabase = new TravelRequestDetailNewItineraryDataAccess(_detailParamNewDataModel);

            return postDatabase.PostDatabaseData();
        }
    }
}
