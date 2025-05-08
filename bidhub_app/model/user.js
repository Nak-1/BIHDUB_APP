import mongoose from 'mongoose';

const socialMediaSchema = new mongoose.Schema({
  facebook: { type: String },
  instagram: { type: String },
  twitter: { type: String },
  youtube: { type: String },
  linkedin: { type: String },
  pinterest: { type: String },
  etsy: { type: String },
  '500px': { type: String }
}, { _id: false });

const userSchema = new mongoose.Schema({
  id: { 
    type: Number, 
    required: true, 
    unique: true 
  },
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  phone: { 
    type: String 
  },
  avatar: { 
    type: String, 
    default: '/assets/users/default.png' 
  },
  role: { 
    type: String, 
    enum: ['buyer', 'seller', 'both'], 
    required: true 
  },
  verified: { 
    type: Boolean, 
    default: false 
  },
  rating: { 
    type: Number, 
    default: 0, 
    min: 0, 
    max: 5 
  },
  joinDate: { 
    type: Date, 
    default: Date.now 
  },
  location: { 
    type: String 
  },
  bio: { 
    type: String 
  },
  socialMedia: { 
    type: socialMediaSchema, 
    default: {} 
  },
  itemsSold: { 
    type: Number, 
    default: 0 
  },
  itemsBought: { 
    type: Number, 
    default: 0 
  },
  favoriteCategories: { 
    type: [String], 
    default: [] 
  },
  password: { 
    type: String,
    required: true,
    select: false
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, { 
  timestamps: true 
});

userSchema.methods.updateRating = function(newRating) {
  if (newRating >= 0 && newRating <= 5) {
    this.rating = newRating;
    return true;
  }
  return false;
};

userSchema.methods.incrementItemsSold = function() {
  this.itemsSold += 1;
};

userSchema.methods.incrementItemsBought = function() {
  this.itemsBought += 1;
};

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;