using BusinessRef.Interfaces.Customs;
using BusinessRef.Interfaces.Generics;
using BusinessRef.Model.EmployeeTravel;
using DataAccess.EmployeeTravel;

using model = BusinessRef.Model.EmployeeTravel.TravelRequestDetailReturnAccomodationNewDataModel;

namespace BusinessLogic.EmployeeTravel
{
    public class TravelRequestDetailNewAccomodationDataLogic : ITravelRequestDetailAccomodationNewData
    {
        private readonly TravelRequestDetailParamAccomodationNewDataModel _detailParamNewDataModel;

        public TravelRequestDetailNewAccomodationDataLogic(TravelRequestDetailParamAccomodationNewDataModel detailParamNewDataModel)
        {
            _detailParamNewDataModel = detailParamNewDataModel;
        }
        public model GetDmlTravelRequestDetailAccomodationNewData()
        {
            IPostDatabaseData<model> postDatabase = new TravelRequestDetailNewAccomodationDataAccess(_detailParamNewDataModel);

            return postDatabase.PostDatabaseData();
        }
    }
}
