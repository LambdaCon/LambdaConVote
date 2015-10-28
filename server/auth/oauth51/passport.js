var Promise = require('mpromise');
var passport = require('passport');
var OAuth2Strategy = require('passport-oauth2');
var request = require('request');

function loadProfile(profile, accessToken, url) {
  console.log("Creating promises");
  var promise = new Promise();
  console.log("Promise created");
  if (Object.keys(profile).length > 0) {
    // console.log("Profile already received!!!");
    promise.fulfill(profile);
    return promise;
  }

  // console.log("[loadProfile] Loading profile from: ", url);
  request({
    'method': 'GET',
    'uri': url,
    'headers': { 'Accept': 'application/json' },
    'auth': { 'bearer': accessToken }
  }, function (error, response, body) {
    // console.log("[loadProfile] Request returned with: ", error, body);
    if (!error && response.statusCode === 200) {
      try {
        promise.fulfill(JSON.parse(body));
      }
      catch (err) {
        promise.reject(err);
      }
    }
    promise.reject(error);
  });

  return promise;
};


exports.setup = function (User, config) {
  var oauth51Config = {
    authorizationURL: config.oauth51.base_url + '/oauth/authorize',
    tokenURL: config.oauth51.base_url + '/oauth/token',
    profileUrl: config.oauth51.base_url + '/api/v1/users/me'
  };

  passport.use(new OAuth2Strategy({
      authorizationURL: oauth51Config.authorizationURL,
      tokenURL: oauth51Config.tokenURL,
      clientID: config.oauth51.clientID,
      clientSecret: config.oauth51.clientSecret,
      callbackURL: config.oauth51.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      // console.log("accessToken: ", accessToken, "refreshToken: ", refreshToken, "profile: ", profile);
      loadProfile(profile, accessToken, oauth51Config.profileUrl).then(function (profile) {
        return User.findOne({ 'oauth51.id': profile.id }).exec().then(function (result) {
          console.log("Results: ", result);
          var user = result || new User();
          // console.log("User found ... ", user);
          user.name = profile.name;
          user.email = profile.email;
          user.role = profile.is_admin ? 'admin' : 'user';
          user.username = profile.username;
          user.provider = 'oauth51';
          profile.accessToken = accessToken;
          profile.refreshToken = refreshToken;
          user.oauth51 = profile;
          var promise = new Promise();
          user.save(function (err, user) {
            if (err){ return promise.reject(err); }
            promise.fulfill(user);
          });
          return promise;
        });
      }).then(function (user) {
        // console.log("return user", user);
        done(null, user);
      }, function(err){
        console.log(err);
        done(err);
      });
    }));
};
