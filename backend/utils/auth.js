import jwt from 'jsonwebtoken';

const signToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      profileImage: user.profileImage,
      picture: user.picture,
      facebook: user.facebook,
      twitter: user.twitter,
      linkedIn: user.linkedIn,
      generatedPasword: user.generatedPasword,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    },
  );
};

export { signToken };
