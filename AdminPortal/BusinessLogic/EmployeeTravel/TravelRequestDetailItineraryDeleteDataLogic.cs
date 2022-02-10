using BusinessRef.Interfaces.Customs;
using BusinessRef.Interfaces.Generics;
using BusinessRef.Model.EmployeeTravel;
using DataAccess.EmployeeTravel;

using model = BusinessRef.Model.EmployeeTravel.TravelRequestDetailReturnItineraryDeleteDataModel;

namespace BusinessLogic.EmployeeTravel
{
    public class TravelRequestDetailItineraryDeleteDataLogic: ITravelRequestDetailItineraryDeleteData
    {
        private readonly TravelRequestDetailParamItineraryDeleteDataModel _dataModel;
        public TravelRequestDetailItineraryDeleteDataLogic(TravelRequestDetailParamItineraryDeleteDataModel dataModel)
        {
            _dataModel = dataModel;
        }

        public model TravelRequestDetailItineraryDeleteData()
        {
            IPostDatabaseData<model> data = new TravelRequestDetailItineraryDeleteDataAccess(_dataModel);

            return data.PostDatabaseData();
        }
    }
}
