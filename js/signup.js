function OnCognitoSignUp() {
  var poolData = {
    UserPoolId: secrets.UserPoolId, // Your user pool id here
    ClientId: secrets.ClientId, // Your client id here
  };
  var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  var username = document.getElementById("username").value;
  var phone_number = document.getElementById("phonenumber").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  var attributeList = [
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "phone_number",
      Value: phone_number,
    }),
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "email",
      Value: email,
    }),
  ];

  userPool.signUp(
    username,
    password,
    attributeList,
    null,
    function (err, result) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      var cognitoUser = result.user;
      console.log("user name is " + cognitoUser.getUsername());
    }
  );
}
