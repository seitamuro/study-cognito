function OnCognitoConfirmRegistration() {
  var poolData = {
    UserPoolId: secrets.UserPoolId, // Your user pool id here
    ClientId: secrets.ClientId, // Your client id here
  };
  var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  var username = document.getElementById("username").value;
  var code = document.getElementById("ConfirmCode").value;

  var userData = {
    Username: username,
    Pool: userPool,
  };

  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.confirmRegistration(code, true, function (err, result) {
    if (err) {
      alert(err.message || JSON.stringify(err));
      return;
    }
    console.log("call result: " + result);
  });
}
