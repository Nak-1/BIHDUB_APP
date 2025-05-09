import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  id: { 
    type: Number, 
    required: true, 
    unique: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  summary: { 
    type: String, 
    required: true 
  },
  content: { 
    type: String, 
    required: true 
  },
  image: { 
    type: String,
    default: '/assests/news/placeholder.jpg'
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
  author: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  tags: {
    type: [String],
    default: []
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  viewCount: {
    type: Number,
    default: 0
  },
  slug: {
    type: String,
    unique: true
  },
  featuredOrder: {
    type: Number,
    default: 0
  }
}, { 
  timestamps: true 
});

newsSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

newsSchema.methods.incrementViewCount = function() {
  this.viewCount += 1;
  return this.save();
};

newsSchema.statics.findBySlug = function(slug) {
  return this.findOne({ slug: slug });
};

newsSchema.statics.findFeatured = function(limit = 5) {
  return this.find({ isPublished: true, featuredOrder: { $gt: 0 } })
    .sort({ featuredOrder: -1 })
    .limit(limit);
};

newsSchema.statics.findLatest = function(limit = 10) {
  return this.find({ isPublished: true })
    .sort({ date: -1 })
    .limit(limit);
};

newsSchema.statics.findByCategory = function(category, limit = 10) {
  return this.find({ isPublished: true, category: category })
    .sort({ date: -1 })
    .limit(limit);
};

const News = mongoose.models.News || mongoose.model('News', newsSchema);

export default News;