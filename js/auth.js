function OnCognitoAuthenticateUser() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  var authenticationData = {
    Username: username,
    Password: password,
  };

  var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
    authenticationData
  );
  var poolData = {
    UserPoolId: secrets.UserPoolId, // Your user pool id here
    ClientId: secrets.ClientId, // Your client id here
  };
  var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  var userData = {
    Username: username,
    Pool: userPool,
  };

  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
      console.log("onSuccess");
      var idToken = result.getIdToken().getJwtToken(); // IDトークン
      var accessToken = result.getAccessToken().getJwtToken(); // アクセストークン
      var refreshToken = result.getRefreshToken().getToken(); // 更新トークン

      console.log("idToken : " + idToken);
      console.log("accessToken : " + accessToken);
      console.log("refreshToken : " + refreshToken);

      //POTENTIAL: Region needs to be set if not already set previously elsewhere.
      AWS.config.region = "us-east-1";

      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: secrets.IdentityPoolId, // your identity pool id here
        Logins: {
          // Change the key below according to the specific region your user pool is in.
          "cognito-idp.us-east-1.amazonaws.com/us-east-1_QrH7S9Ibw": result
            .getIdToken()
            .getJwtToken(),
        },
      });

      //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
      AWS.config.credentials.refresh((error) => {
        if (error) {
          console.error(error);
        } else {
          // Instantiate aws sdk service objects now that the credentials have been updated.
          // example: var s3 = new AWS.S3();
          console.log("Successfully logged!");
        }
      });
    },

    onFailure: function (err) {
      alert(err.message || JSON.stringify(err));
    },
  });
}
