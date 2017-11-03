import UserApi from './src/API/UsersApi';

export async function getUsers(event: any, context: any, callback: any){

  let userApi = new UserApi();
  let result =  await userApi.getUsers(event);
  
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: {
        users: result
      },
      input: event
    })
    };

    callback(null, response);
}
