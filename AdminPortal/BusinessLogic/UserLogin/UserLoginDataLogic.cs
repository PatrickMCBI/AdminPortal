using BusinessRef.Interfaces.Customs;
using BusinessRef.Interfaces.Generics;
using BusinessRef.Model.UserLogin;
using DataAccess.UserLogin;

using model = BusinessRef.Model.UserLogin.UserLoginReturnDataModel;

namespace BusinessLogic.UserLogin
{
    public class UserLoginDataLogic : IUserLoginData
    {
        private readonly UserLoginParamDataModel _userLoginParam;

        public UserLoginDataLogic(UserLoginParamDataModel userLoginParam)
        {
            _userLoginParam = userLoginParam;
        }
        public model GetDmlUserLoginData()
        {
            IPostDatabaseData<model> userLogin = new UserLoginDataAccess(_userLoginParam);

            return userLogin.PostDatabaseData();
        }
    }
}
