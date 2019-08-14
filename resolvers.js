const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const createToken = (user, secret, expiresIn) => {
    const { username, email } = user;
    return jwt.sign({username,email},secret,{expiresIn})
}

exports.resolvers = {
    Query: {
        getAllFavs: async (root, args, { Fav }) => {
            const allFavs = await Fav.find().sort({createdDate: "desc"});
            return allFavs;
          },
          getCurrentUser: async(root, args, {currentUser, User}) => {
            if(!currentUser){
              return null;
            }
            const user = await User.findOne({username: currentUser.username})
            .populate({
              path: 'favorites',
              model: 'Fav'
            });
            return user;
          },
          getUserFav: async (root, { username },{Fav}) => {
            const userFav = await Fav.find({username}).sort({
              createdDate: 'desc'
            });
            return userFav; 
          },
          getUserInfo: async (root, {username}, {User}) => {
            if(!username){
              return null;
            }
            const user = await User.find({username})
            return user;
          }
    },
    Mutation: {
        addFav: async (
            root,
            { place, order, username },
            { Fav }
          ) => {
            const newFav = await new Fav({
                place,
                order,
                username
            }).save();
            return newFav;
          },
          signinUser: async (root, {username,password}, {User}) => {
            const user = await User.findOne({username});
            if(!user){
              throw new Error('User not found')
            }
            const isValidPassword = await bcrypt.compare(password, user.password);
            if(!isValidPassword){
              throw new Error('invalid password');
            }
            return { token: createToken(user, process.env.SECRET, "1hr") };
          },
      
          signupUser: async (root, { email, password, username, city, state, allergies, bio }, { User }) => {
            const user = await User.findOne({ username });
            if (user) {
              throw new Error("User already exists");
            }
            const newUser = await new User({
                email,
                password,
                username,
                city,
                state,
                allergies,
                bio
            }).save();
            return { token: createToken(newUser, process.env.SECRET, "1hr") };
          }
    }
}
