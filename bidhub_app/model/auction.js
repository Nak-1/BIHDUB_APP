import mongoose from 'mongoose';

const SellerSchema = new mongoose.Schema({
  id: Number,
  name: String,
  rating: Number,
  verified: Boolean
});

const BidSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  amount: Number,
  timestamp: { type: Date, default: Date.now }
});

const AuctionSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description']
  },
  price: {
    type: Number,
    required: true
  },
  startingPrice: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: '₮'
  },
  image: {
    type: String,
    required: true
  },
  additionalImages: [String],
  timeLeft: String,
  endDate: {
    type: Date,
    required: true
  },
  currentBids: {
    type: Number,
    default: 0
  },
  bidHistory: [BidSchema],
  seller: SellerSchema,
  category: String,
  condition: String,
  dimensions: String,
  materials: String,
  age: String,
  provenance: String,
  shippingOptions: [String],
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

AuctionSchema.methods.isActive = function() {
  return new Date() < this.endDate;
};

AuctionSchema.methods.placeBid = function(userId, amount) {
  if (!this.isActive()) {
    throw new Error('Auction has ended');
  }
  
  if (amount <= this.price) {
    throw new Error('Bid amount must be higher than current price');
  }
  
  const newBid = {
    userId,
    amount,
    time: new Date()
  };
  
  this.bidHistory.unshift(newBid);
  this.price = amount;
  this.currentBids += 1;
  
  return this;
};

export default mongoose.models.Auction || mongoose.model('Auction', AuctionSchema);
