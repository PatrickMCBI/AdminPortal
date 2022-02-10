using BusinessRef.Interfaces.Customs;
using BusinessRef.Interfaces.Generics;
using BusinessRef.Model.EmployeeTravel;
using DataAccess.EmployeeTravel;

using model = BusinessRef.Model.EmployeeTravel.TravelRequestDetailReturnEmployeeNameNewDataModel;

namespace BusinessLogic.EmployeeTravel
{
    public class TravelRequestDetailNewEmployeeNameDataLogic : ITravelRequestDetailEmployeeNameNewData
    {
        private readonly TravelRequestDetailParamEmployeeNameNewDataModel _detailParamNewDataModel;

        public TravelRequestDetailNewEmployeeNameDataLogic(TravelRequestDetailParamEmployeeNameNewDataModel detailParamNewDataModel)
        {
            _detailParamNewDataModel = detailParamNewDataModel;
        }

        public model GetDmlTravelRequestDetailEmployeeNameNewData()
        {
            IPostDatabaseData<model> postDatabase = new TravelRequestDetailNewEmployeeNameDataAccess(_detailParamNewDataModel);

            return postDatabase.PostDatabaseData();
        }
    }
}
