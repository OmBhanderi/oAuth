import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { AppDataSource } from "../config/data-source";
import { Users } from "../modules/auth/user.entity";

const userRepository = AppDataSource.getRepository(Users);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        let user = await userRepository.findOne({
          where: { email: profile.emails?.[0].value },
        });

        if (!user) {
          user = userRepository.create({
            email: profile.emails?.[0].value,
            name: profile.displayName,
            googleId: profile.id,
          });

          await userRepository.save(user);
        }

        return done(null, user);
      } catch (error) {
        return done(error, undefined);
      }
    }
  )
);

export default passport;