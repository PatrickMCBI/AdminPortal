

using BusinessRef.Interfaces.Customs;
using BusinessRef.Interfaces.Generics;
using DataAccess.EmployeeTravel;

using model = BusinessRef.Model.EmployeeTravel.TravelRequestReturnNewRefDataModel;

namespace BusinessLogic.EmployeeTravel
{
    public class TravelRequestNewRefDataLogic : IGetTravelRequestNewReferenceData
    {
        public model GetTravelRequestNewReferenceData()
        {
            IGetDatabaseData<model> getDatabase = new TravelRequestNewRefDataAccess();

            return getDatabase.GetDatabaseData();
        }
    }
}
