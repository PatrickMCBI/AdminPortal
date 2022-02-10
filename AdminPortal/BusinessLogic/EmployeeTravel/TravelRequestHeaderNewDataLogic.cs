using BusinessRef.Interfaces.Customs;
using BusinessRef.Interfaces.Generics;
using BusinessRef.Model.EmployeeTravel;
using DataAccess.EmployeeTravel;

using model = BusinessRef.Model.EmployeeTravel.TravelRequestHeaderReturnNewDataModel;

namespace BusinessLogic.EmployeeTravel
{
    public class TravelRequestHeaderNewDataLogic : ITravelRequestHeaderNewData
    {
        private readonly TravelRequestHeaderParamNewDataModel _mastParamNewDataModel;

        public TravelRequestHeaderNewDataLogic(TravelRequestHeaderParamNewDataModel mastParamNewDataModel)
        {
            _mastParamNewDataModel = mastParamNewDataModel;
        }

        public model GetDmlTravelRequestHeaderNewData()
        {
            IPostDatabaseData<model> postDatabase = new TravelRequestHeaderNewDataAccess(_mastParamNewDataModel);

            return postDatabase.PostDatabaseData();
        }
    }
}
