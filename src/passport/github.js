import UserDao from "../dao/mongoDB/usersDao.js";
import passport from "passport";
import { Strategy as GithubStrategy } from "passport-github2";

const userDao = new UserDao();

const strategyOptions = {
    clientID: 'Iv1.9007bd49b3171ae6',
    clientSecret: '2031b93564e6ee953392cc1f3548b5cb0a1a37f3',
    callbackURL: 'http://localhost:3000/users/github'
};

const github = async(profile, done) =>{
    console.log('profile:::', profile);
    const email = profile._json.email !== null ? profile._json.email : profile._json.blog;
    const user = await userDao.getUserByEmail(email);
    
    if(user) return done(null, user);
    const newUser = await userDao.createUser({
        firstName: profile._json.name.split(' ')[0],
        lastName: profile._json.name.split(' ')[1] + ' ' + profile._json.name.split(' ')[2],
        email,
        password: ' ',
        githubUser: true
    });
    return done(null, newUser);
};

passport.use('github', new GithubStrategy(strategyOptions, github));