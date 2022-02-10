using BusinessRef.Interfaces.Customs;
using BusinessRef.Interfaces.Generics;
using BusinessRef.Model.EmployeeTravel;
using DataAccess.EmployeeTravel;

using model = BusinessRef.Model.EmployeeTravel.TravelRequestDetailReturnAccomodationDeleteDataModel;

namespace BusinessLogic.EmployeeTravel
{
    public class TravelRequestDetailAccomodationDeleteDataLogic : ITravelRequestDetailAccomodationDeleteData
    {
        private readonly TravelRequestDetailParamAccomodationDeleteDataModel _dataModel;
        public TravelRequestDetailAccomodationDeleteDataLogic(TravelRequestDetailParamAccomodationDeleteDataModel dataModel)
        {
            _dataModel = dataModel;
        }

        public model TravelRequestDetailAccomodationDeleteData()
        {
            IPostDatabaseData<model> data = new TravelRequestDetailAccomodationDeleteDataAccess(_dataModel);

            return data.PostDatabaseData();
        }
    }
}
