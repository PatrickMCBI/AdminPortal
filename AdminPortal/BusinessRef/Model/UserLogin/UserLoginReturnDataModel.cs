

using BusinessRef.Abstract;

namespace BusinessRef.Model.UserLogin
{
    public class UserLoginReturnDataModel : ErrorStatus
    {
        /*  1 Success
           2 Email Does not exist
           3 Password Does not Exist
           4 Password is not current
           5 SMTP Service not avaiable at the moment
        *
        *
        */
        public int StatusCodeNumber { get; set; }
        public int UserNameID { get; set; }
        public string UserFirstName { get; set; }
        public string UserLastName { get; set; }
    }
}
