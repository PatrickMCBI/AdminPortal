using BusinessRef.Interfaces.Customs;
using BusinessRef.Interfaces.Generics;
using BusinessRef.Model.EmployeeTravel;
using DataAccess.EmployeeTravel;

using model = BusinessRef.Model.EmployeeTravel.TravelRequestDetailReturnEmployeeDeleteDataModel;

namespace BusinessLogic.EmployeeTravel
{
    public class TravelRequestDetailEmployeeDeleteDataLogic : ITravelRequestDetailEmployeeDeleteData
    {
        private readonly TravelRequestDetailParamEmployeeDeleteDataModel _dataModel;
        public TravelRequestDetailEmployeeDeleteDataLogic(TravelRequestDetailParamEmployeeDeleteDataModel dataModel)
        {
            _dataModel = dataModel;
        }

        public model TravelRequestDetailEmployeeDeleteData()
        {
            IPostDatabaseData<model> data = new TravelRequestDetailEmployeeDeleteDataAccess(_dataModel);

            return data.PostDatabaseData();
        }
    }
}
