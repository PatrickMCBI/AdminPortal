using BusinessRef.Abstract;
using BusinessRef.Interfaces.Customs;
using BusinessRef.Interfaces.Generics;
using BusinessRef.Model.EmployeeTravel;
using DataAccess.EmployeeTravel;

using model = BusinessRef.Model.EmployeeTravel.TravelRequestRecordReturnRefDataModel;

namespace BusinessLogic.EmployeeTravel
{
    public class TravelRequestRecordRefDataLogic : IGetTravelRequestRecordRefData
    {
        private readonly TravelRequestRecordParamRefDataModel _dataModel;
        public TravelRequestRecordRefDataLogic(TravelRequestRecordParamRefDataModel dataModel)
        {
            _dataModel = dataModel;
        }
        public model GetTravelRequestRecordRefData()
        {
            IGetDatabaseData<model> data = new TravelRequestRecordRefDataAccess(_dataModel);

            return data.GetDatabaseData();
        }
    }
}
