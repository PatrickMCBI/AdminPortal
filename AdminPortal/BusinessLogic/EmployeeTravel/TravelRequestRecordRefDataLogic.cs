using BusinessRef.Abstract;
using BusinessRef.Interfaces.Customs;
using BusinessRef.Interfaces.Generics;
using DataAccess.EmployeeTravel;

using model = BusinessRef.Model.EmployeeTravel.TravelRequestRecordReturnRefDataModel;

namespace BusinessLogic.EmployeeTravel
{
    public class TravelRequestRecordRefDataLogic : IGetTravelRequestRecordRefData
    {
        public model GetTravelRequestRecordRefData()
        {
            IGetDatabaseData<model> data = new TravelRequestRecordRefDataAccess();

            return data.GetDatabaseData();
        }
    }
}
